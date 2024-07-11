import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loggedInUserLastLoadedPlanState = atom({
  key: "loggedInUserLastLoadedPlanState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
