export class CoreModule {
  public constructor() {
    mp.events.add({
      playerJoin: this.onPlayerJoin,
      packagesLoaded: this.onPackagesLoaded,
    });
  }

  private onPlayerJoin: IServerEvents["playerJoin"] = player => {
    player.outputChatBox("Welcome to ~g~ParadoxRP");
    // player.position = new mp.Vector3(4840.571, -5174.425, 2.0);
  };

  private onPackagesLoaded: IServerEvents["packagesLoaded"] = () => {
    // mp.world.requestIpl("0x9A9D1BA639675CF1");
  };
}
