export class CoreModule {
  public constructor() {
    mp.events.add({
      playerJoin: this.onPlayerJoin,
    });
  }

  private onPlayerJoin: IServerEvents["playerJoin"] = player => {
    player.outputChatBox("Welcome to ~g~ParadoxRP");
  };
}

new CoreModule();
