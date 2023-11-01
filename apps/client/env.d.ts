/// <reference types="@ragempcommunity/types-client" />

declare interface EventMpPool {
  addCommand<T extends Function>(name: string, callback: T): void;
}
