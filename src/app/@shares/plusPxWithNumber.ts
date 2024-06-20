export function plusPx(
  px: number | string | undefined,
  delta: number,
  constDelta = 1,
): number {
  if (!px) {
    return delta;
  }
  if (!Number.isNaN(+px)) {
    return +px + delta;
  }
  return (
    +(px as string).substring(0, (px as string).length - 2) + delta * constDelta
  );
}

export function pxToNumner(px: string | undefined): number {
  return px?.endsWith('px') ? +px.substring(0, px.length - 2) || 0 : 0;
}
