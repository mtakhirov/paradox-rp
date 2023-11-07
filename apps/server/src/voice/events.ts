export class VoiceEvents {
  public constructor() {
    mp.events.add({
      addVoiceListener: this.addVoiceListener,
      removeVoiceListener: this.removeVoiceListener,
    });
  }

  private addVoiceListener = (player: PlayerMp, target: PlayerMp) => {
    if (target && target instanceof PlayerMp) {
      player.enableVoiceTo(target);
      return;
    }

    return;
  };

  private removeVoiceListener = (player: PlayerMp, target: PlayerMp) => {
    if (target && target instanceof PlayerMp) {
      player.disableVoiceTo(target);
      return;
    }

    return;
  };
}
