/** Register service worker for offline / installable app. */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // SW only works over http(s), not file://
    if (location.protocol === "file:") return;
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.warn("SW register failed", err);
    });
  });
}
