interface ViewCountProps {
  path: string;
}

export function ViewCount({ path }: ViewCountProps) {
  // GitHub Pages is static and cannot safely expose the credentials needed by
  // the former GA4 route. Keep the page layout while omitting that live metric.
  void path;
  return null;
}
