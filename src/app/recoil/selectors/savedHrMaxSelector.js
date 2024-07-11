import { selector } from "recoil";
import { savedHrMaxState } from "../atoms/user/savedHrMaxState";

export const savedHrMaxSelector = selector({
  key: "savedHrMaxSelector",
  get: ({ get }) => {
    return savedHrMaxState;
  },
});
