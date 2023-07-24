export const getBaseUrl = () => {
  if (typeof window !== "undefined")
    return `${window.location.protocol}//${window.location.host}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};
