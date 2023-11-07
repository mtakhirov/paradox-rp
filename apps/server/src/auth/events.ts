import { PrismaClient } from "@prisma/client";

export class AuthEvents {
  protected static prisma: PrismaClient;

  public constructor() {
    this.initPrisma();

    mp.events.add("packagesLoaded", () => {
      console.log("Loaded with prisma");
    });
  }

  private initPrisma = () => {
    if (!AuthEvents.prisma) {
      AuthEvents.prisma = new PrismaClient();
    }

    return AuthEvents.prisma;
  };
}
