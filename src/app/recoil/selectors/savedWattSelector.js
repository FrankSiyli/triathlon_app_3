import { selector } from "recoil";
import { savedWattState } from "../atoms/user/savedWattState";

export const savedWattSelector = selector({
  key: "savedWattSelector",
  get: ({ get }) => {
    return savedWattState;
  },
});
