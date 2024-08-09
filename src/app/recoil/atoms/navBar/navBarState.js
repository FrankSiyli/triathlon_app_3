// src/app/recoil/atoms/navBarState.js

import { atom } from 'recoil';

export const navBarState = atom({
  key: 'navBarState', 
  default: 'calendar', 
});
