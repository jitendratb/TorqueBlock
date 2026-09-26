
const TRUSTINDEX_SRC =
  "https://cdn.trustindex.io/loader.js?1ced8246880d851ac056a341c19";
const SCRIPT_ID = "trustindex-script";
const EXPIRED_MARKER = "7-day trial period has expired";

const WIDGET_SELECTOR = '[class*="ti-"]';


export function loadTrustindexWidget(
  container,
  { onLoaded, onExpired, rootMargin = "200px", timeout = 6000 } = {}
) {
  if (!container || typeof IntersectionObserver === "undefined") {
    return () => {};
  }

  let mutationObserver;
  let timeoutId;
  let done = false;

  const cleanup = () => {
    observer.disconnect();
    mutationObserver?.disconnect();
    clearTimeout(timeoutId);
  };

 
  const finish = (kind) => {
    if (done) return;
    done = true;
    cleanup();
    if (!container.isConnected) return;
    if (kind === "expired") onExpired?.();
    else onLoaded?.();
  };

  const settle = () => {
    if (done) return true;
    if (container.textContent.includes(EXPIRED_MARKER)) {
      finish("expired");
      return true;
    }
    if (container.querySelector(WIDGET_SELECTOR)) {
      finish("loaded");
      return true;
    }
    return false;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();

      if (container.querySelector(`#${SCRIPT_ID}`)) return;


      mutationObserver = new MutationObserver(() => settle());
      mutationObserver.observe(container, { childList: true, subtree: true });

      timeoutId = setTimeout(() => finish("loaded"), timeout);

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = TRUSTINDEX_SRC;
      script.async = true;

      script.onload = () => settle();

      container.appendChild(script);
    },
    { rootMargin }
  );

  observer.observe(container);

  return cleanup;
}
