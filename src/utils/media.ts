export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  return /\/video\/upload\//i.test(url) || /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

export function videoPosterUrl(url: string): string | undefined {
  if (!isVideoUrl(url) || !/res\.cloudinary\.com/i.test(url)) return undefined;
  return url
    .replace('/video/upload/', '/video/upload/so_0/')
    .replace(/\.(mp4|webm|ogg|mov)(\?.*)?$/i, '.jpg');
}
