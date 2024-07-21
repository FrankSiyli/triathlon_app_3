import { atom } from "recoil";

export const activeComponentState = atom({
  key: "activeComponentState",
  default: "plans",
});
