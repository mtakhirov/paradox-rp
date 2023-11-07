import { ClientCommands } from "./commands";
import { Voice } from "./voice";

function loadModules() {
  new ClientCommands();
  new Voice();
}

loadModules();
