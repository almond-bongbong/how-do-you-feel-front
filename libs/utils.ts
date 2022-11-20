export function throttle(
  fn: (...args: unknown[]) => void,
  delay: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  },
) {
  let timer: number | null = null;
  let previous = 0;
  const { leading, trailing } = options || {};
  return function (...args: unknown[]) {
    const now = Date.now();
    if (!previous && !leading) {
      previous = now;
    }
    const remaining = delay - (now - previous);
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn(...args);
    } else if (!timer && trailing) {
      timer = window.setTimeout(() => {
        previous = leading ? 0 : Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  };
}

export function debounce(fn: (...args: unknown[]) => void, delay: number) {
  let timer: number | null = null;
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
