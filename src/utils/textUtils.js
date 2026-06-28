export const parseBullets = (text) => {
  if (!text) return [];
  
  // Normalize Windows newlines
  const normalized = text.replace(/\r\n/g, '\n');
  
  // If we detect bullet characters at the start of a line (or string), split by those
  if (/^[•\-\*]\s+/m.test(normalized)) {
    return normalized
      .split(/(?:^|\n)(?=[•\-\*]\s+)/)
      .map(b => b.replace(/^[•\-\*]\s*/, '').replace(/\n/g, ' ').trim())
      .filter(Boolean);
  }
  
  // If we detect double newlines, assume paragraphs are bullets
  if (/\n\n/.test(normalized)) {
    return normalized
      .split(/\n\n+/)
      .map(b => b.replace(/\n/g, ' ').trim())
      .filter(Boolean);
  }
  
  // Fallback: split by single newline.
  return normalized.split('\n').map(l => l.trim()).filter(Boolean);
};

export const formatUrl = (url) => {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
};
