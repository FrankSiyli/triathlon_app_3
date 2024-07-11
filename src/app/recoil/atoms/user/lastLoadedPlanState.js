import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const lastLoadedPlanState = atom({
  key: "lastLoadedPlanState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
