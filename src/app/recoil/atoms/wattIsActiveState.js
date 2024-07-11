import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const wattIsActiveState = atom({
  key: "wattIsActiveState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
