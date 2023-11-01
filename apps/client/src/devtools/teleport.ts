export class Teleport {
  public constructor() {
    mp.keys.bind(0x73, false, this.teleportWaypoint);
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
