export class Position {
  public constructor() {
    mp.events.addCommand("position", this.printPosition);
  }

  private printPosition = () => {
    const player = mp.players.local;
    const position = player.position;

    mp.console.logInfo("work");

    mp.gui.chat.push(`Position | x: ${position.x.toFixed(2)} y: ${position.y.toFixed(2)} z: ${position.z.toFixed(2)}`);
  };
}

new Position();
