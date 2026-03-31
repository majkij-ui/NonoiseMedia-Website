/**
 * Push a custom event to the GTM dataLayer (client-only).
 * Safe to call before GTM script finishes loading — initializes dataLayer if needed.
 */
export function sendGTMEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return
  window.dataLayer ??= []
  window.dataLayer.push({ event: eventName, ...params })
}
