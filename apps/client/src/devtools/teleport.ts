export class Teleport {
  protected g_bIslandLoaded = false;

  public constructor() {
    mp.keys.bind(0x73, false, this.teleportWaypoint);

    mp.keys.bind(0x72 /* F3 */, false, () => {
      this.g_bIslandLoaded = !this.g_bIslandLoaded;
      mp.game.invoke("0x9A9D1BA639675CF1", "HeistIsland", this.g_bIslandLoaded);
      mp.game.invoke("0x5E1460624D194A38", this.g_bIslandLoaded); // for island map in pause menu and minimap

      mp.gui.chat.push(`Island ${this.g_bIslandLoaded ? "loaded" : "unloaded"}`);
    });
  }

  private teleportWaypoint: Function = () => {
    const waypoint = mp.game.ui.getFirstBlipInfoId(8);
    if (!mp.game.ui.doesBlipExist(waypoint)) {
      mp.game.graphics.notify("~r~Waypoint not found");
      return;
    }

    const waypointPosition = mp.game.ui.getBlipInfoIdCoord(waypoint);
    if (!waypointPosition) {
      mp.game.graphics.notify("~r~Waypoint not found");
      return;
    }

    waypointPosition.z = this.getZCoord(waypointPosition);
    mp.players.local.position = waypointPosition;
  };

  private getZCoord = (position: Vector3) => {
    let zCoord: number = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, false, false);

    if (!zCoord) {
      for (let i = 1000; i <= 0; i -= 25) {
        mp.game.streaming.requestAdditionalCollisionAtCoord(position.x, position.y, i);
        mp.game.wait(0);
      }

      zCoord = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, 1000, false, false);
      if (!zCoord) return position.z;
    }

    return zCoord + 0.5;
  };
}

new Teleport();
