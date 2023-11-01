export class ClientCommands {
  protected static commandStorage = new Map<string, Function>();

  public constructor() {
    mp.events.addCommand = this.bindAddCommandFunction;

    mp.events.add({
      playerCommand: this.callCommandFunction,
      consoleCommand: this.callCommandFunction,
    });
  }

  private bindAddCommandFunction = (name: string, handlerFn: Function) => {
    if (typeof name !== "string") {
      throw new Error("command name must be string!");
    }

    if (typeof handlerFn !== "function") {
      throw new Error("callback must be function!");
    }

    if (ClientCommands.commandStorage.has(name)) {
      mp.console.logInfo(`${name} command exists`);
      return;
    }

    ClientCommands.commandStorage.set(name, handlerFn);
    mp.console.logInfo(`${name} has ben store`);
  };

  private callCommandFunction = (command: string) => {
    mp.gui.chat.push(`${command} called`);
    mp.console.logInfo(`${command} called`);

    const args = command.split(/\s+/g);
    const commandName = args.shift();
    if (!commandName) {
      mp.gui.chat.push(`${commandName || ""} not found`);
      mp.console.logInfo(`${commandName || ""} not found`);
      return;
    }

    const handlerFn = ClientCommands.commandStorage.get(commandName);

    mp.gui.chat.push(`called ${commandName}`);
    mp.console.logInfo(`called ${commandName}`);

    if (handlerFn) {
      handlerFn(args);
    }
  };
}

new ClientCommands();
