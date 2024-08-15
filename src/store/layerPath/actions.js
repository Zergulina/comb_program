import { createAction } from "@reduxjs/toolkit";

export const pushLayer = createAction("PUSH_LAYER");
export const popLayer = createAction("POP_LAYER");
export const goToLayer = createAction("GO_TO_LAYER");