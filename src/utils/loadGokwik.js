export const loadGokwik = (environment) => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.gokwikSdk) return resolve(true);

    const src = environment === "production" ? "https://pdp.gokwik.co/v4/build/gokwik.js" : "https://sandbox.pdp.gokwik.co/v4/build/gokwik.js";

    const existing = document.querySelector(`script[src="${src}"]`);
    const script = existing || document.createElement("script");

    script.addEventListener("load", () => {
      if (!window.gokwikSdk) script.remove();
      resolve(Boolean(window.gokwikSdk));
    });
    script.addEventListener("error", () => {
      script.remove();
      resolve(false);
    });

    if (!existing) {
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    }
  });
};
