export const cleanQuery = (rawQuery: string): string => {
  const lower = rawQuery.toLowerCase().trim();

  const cleaned = lower
    .replace(/what is\s+/i, '')
    .replace(/tell me about\s+/i, '')
    .replace(/define\s+/i, '')
    .replace(/how does\s+/i, '')
    .replace(/what does\s+/i, '')
    .replace(/\?$/, '')
    .trim();

  return cleaned;
};
