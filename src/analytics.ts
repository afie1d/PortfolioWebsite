export function track(event: string, data?: Record<string, string>): void {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', { event, ...data });
    return;
  }
  navigator.sendBeacon(
    '/api/track',
    JSON.stringify({ event, ...data, ts: Date.now() }),
  );
}
