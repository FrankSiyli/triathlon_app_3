import { selector } from "recoil";
import { savedSwimTimeState } from "../atoms/user/savedSwimTimeState";

export const savedSwimTimeSelector = selector({
  key: "savedSwimTimeSelector",
  get: ({ get }) => {
    return savedSwimTimeState;
  },
});
