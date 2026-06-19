export function extractError(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const res = (err as { response?: { data?: unknown } }).response;
    if (res?.data) {
      const data = res.data as Record<string, unknown>;
      if (typeof data === 'string') return data;
      if (typeof data.message === 'string') return data.message;
      if (data.errors && typeof data.errors === 'object') {
        const msgs = Object.values(data.errors as Record<string, string[]>)
          .flat()
          .filter(Boolean);
        if (msgs.length > 0) return msgs.join(' ');
      }
      if (typeof data.title === 'string') return data.title;
    }
  }
  if (err instanceof Error) return err.message;
  return 'An unexpected error occurred.';
}
