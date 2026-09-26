// Lazily loads the Trustindex reviews widget. The embed script is heavy and
// third-party, so we defer injecting it until the target container scrolls
// near the viewport, then report whether the widget rendered or the account's
// trial has lapsed (Trustindex swaps in a "trial expired" notice in that case).
//
// Usage:
//   useEffect(() => loadTrustindexWidget(ref.current, {
//     onLoaded: () => setLoaded(true),
//     onExpired: () => setIsExpired(true),
//   }), [])

const TRUSTINDEX_SRC =
  "https://cdn.trustindex.io/loader.js?1ced8246880d851ac056a341c19";
const SCRIPT_ID = "trustindex-script";
const EXPIRED_MARKER = "7-day trial period has expired";

/**
 * Attach a viewport observer that injects the Trustindex loader once `container`
 * is nearly visible.
 *
 * @param {HTMLElement|null} container - element the widget renders into.
 * @param {object} [options]
 * @param {() => void} [options.onLoaded]  - called when the widget renders.
 * @param {() => void} [options.onExpired] - called when the trial notice shows.
 * @param {string} [options.rootMargin]    - observer pre-load margin.
 * @param {number} [options.checkDelay]    - ms to wait for the embed to paint
 *                                           before inspecting its markup.
 * @returns {() => void} cleanup that disconnects the observer.
 */
export function loadTrustindexWidget(
  container,
  { onLoaded, onExpired, rootMargin = "200px", checkDelay = 800 } = {}
) {
  if (!container || typeof IntersectionObserver === "undefined") {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();

      // Guard against double-injection (StrictMode remounts / re-observes).
      if (container.querySelector(`#${SCRIPT_ID}`)) return;

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = TRUSTINDEX_SRC;
      script.async = true;

      script.onload = () => {
        setTimeout(() => {
          // Bail if the container was unmounted while the embed loaded.
          if (!container.isConnected) return;

          if (container.innerHTML.includes(EXPIRED_MARKER)) {
            onExpired?.();
          } else {
            onLoaded?.();
          }
        }, checkDelay);
      };

      container.appendChild(script);
    },
    { rootMargin }
  );

  observer.observe(container);

  return () => observer.disconnect();
}
