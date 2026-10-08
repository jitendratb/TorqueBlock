const SWIPE_RATIO = 0.18;
const FLICK_MS = 250;
const FLICK_PX = 40;

export const TAP_SLOP = 8;
export const SLIDE_EASE = "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)";

export const isSwipe = (dx, elapsed, width) => Math.abs(dx) > width * SWIPE_RATIO || (elapsed < FLICK_MS && Math.abs(dx) > FLICK_PX);
export const resist = (dx, index, count) => ((index === 0 && dx > 0) || (index === count - 1 && dx < 0) ? dx / 3 : dx);
