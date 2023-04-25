import { useCallback } from 'react';

/**
 * @description A small utility function to quickly add or remove 'overflow: hidden !important' to the body element. Used to prevent scrolling when the mobile navigation menu is open.
 *
 * @param condition A boolean value where when true, will add 'overflow: hidden !important' to the body element, and when false, will remove it.
 */

const preventScroll = (condition: boolean): void => {
  const target = document.getElementById('body');
  console.log('condition', condition);
  if (target && condition) {
    target.setAttribute('style', 'overflow: hidden !important');
  } else {
    target?.removeAttribute('style');
  }
};

export default preventScroll;
