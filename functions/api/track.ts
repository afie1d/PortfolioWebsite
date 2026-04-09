interface TrackPayload {
  event: string;
  ts?: number;
  [key: string]: unknown;
}

// Cloudflare Pages Function — receives analytics events from the client.
// In production, wire up the Analytics Engine binding in wrangler.toml.
export async function onRequestPost(context: {
  request: Request;
}): Promise<Response> {
  try {
    const body = await context.request.text();
    const payload = JSON.parse(body) as TrackPayload;

    // TODO: write to Analytics Engine when binding is configured:
    // const ae = (context.env as Record<string, AnalyticsEngineDataset>)['AE'];
    // ae?.writeDataPoint({ blobs: [payload.event], indexes: [payload.ts?.toString() ?? ''] });

    console.log('[track]', payload);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
