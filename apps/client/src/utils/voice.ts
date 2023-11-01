export class Voice {
  private KEY_B = 0x42;
  private KEY_HOLD = true;

  protected static listeners = new Map<number, PlayerMp>();
  protected static interval?: number;

  public constructor() {
    mp.keys.bind(this.KEY_B, this.KEY_HOLD, () => {
      //   const player = mp.players.local;
      mp.voiceChat.muted = !mp.voiceChat.muted;
      mp.game.graphics.notify("Voice Chat: " + (!mp.voiceChat.muted ? "~g~enabled" : "~r~disabled"));
      mp.game.graphics.notify("Pressed");
    });

    mp.keys.bind(this.KEY_B, false, () => {
      mp.game.graphics.notify("Cancelled");
    });

    mp.events.add({
      playerQuit: this.removeListener,
    });

    if (Voice.interval) {
      clearInterval(Voice.interval);
      Voice.interval = undefined;
    }

    Voice.interval = setInterval(this.setTickInterval, 500);
  }

  private addListener = (player: PlayerMp) => {
    const listeners = Voice.listeners;

    player.voice3d = true;
    player.voiceVolume = 1.0;

    listeners.set(player.remoteId, player);
  };

  private removeListener: IClientEvents["playerQuit"] = player => {
    if (Voice.listeners.has(player.remoteId)) {
      Voice.listeners.delete(player.remoteId);
    }
  };

  private setTickInterval = () => {
    const localPlayer = mp.players.local;
    const localPlayerPosition = localPlayer.position;

    mp.players.forEachInRange(localPlayerPosition, 50.0, player => {
      if (player === localPlayer) return;

      const position = player.position;
      const distance = mp.game.system.vdist(
        position.x,
        position.y,
        position.z,
        localPlayerPosition.x,
        localPlayerPosition.y,
        localPlayerPosition.z
      );

      if (distance <= 50.0) {
        this.addListener(player);
      }
    });

    Array.from(Voice.listeners.values()).forEach(player => {
      if (player.handle === 0) {
        this.removeListener(player);
        return;
      }

      const position = player.position;
      const distance = mp.game.system.vdist(
        position.x,
        position.y,
        position.z,
        localPlayerPosition.x,
        localPlayerPosition.y,
        localPlayerPosition.z
      );

      if (distance > 50.0) {
        this.removeListener(player);
        return;
      }

      player.voiceVolume = 1 - distance / 50.0;
    });
  };
}

new Voice();
