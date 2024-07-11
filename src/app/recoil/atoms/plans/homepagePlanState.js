import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { examplePlan } from "../../../../../database/mockDb";

const { persistAtom } = recoilPersist();

export const homepagePlanState = atom({
  key: "homepagePlanState",
  default: [examplePlan],
  effects_UNSTABLE: [persistAtom],
});
