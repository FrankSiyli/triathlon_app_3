import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { newMockPlan } from "../../../../../database/mockDb";

const { persistAtom } = recoilPersist();

export const newPlanState = atom({
  key: "newPlanState",
  default: newMockPlan,
  effects_UNSTABLE: [persistAtom],
});
