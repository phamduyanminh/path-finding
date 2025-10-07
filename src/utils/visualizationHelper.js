import { ANIMATION_SPEED } from '../constants/gridConstants';

/**
 * Creates a delay promise for animations
 * @param {number} ms - Delay in ms
 * @returns {Promise}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Delays for exploration animation
 * @returns {Promise}
 */
export const explorationDelay = () => delay(ANIMATION_SPEED.EXPLORING);

/**
 * Delays for path animation
 * @returns {Promise}
 */
export const pathDelay = () => delay(ANIMATION_SPEED.PATH);