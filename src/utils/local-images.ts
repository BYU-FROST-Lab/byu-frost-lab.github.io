type PhotoImports = Record<string, { default: unknown }>;

export const makePhotoResolver =
  (photoImports: PhotoImports) =>
  (photo?: string | null): string | unknown | null | undefined => {
    if (!photo) return photo;
    // Convert frontmatter string paths to the glob key so Astro can serve optimized assets.
    const key = photo.replace(/^\/?src\//, '../../');
    return photoImports[key]?.default ?? photo;
  };
