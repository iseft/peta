// Relative on purpose: Next resolves it against the root layout's
// `metadataBase`, which comes from the request rather than the build.
export const getOgImageUrl = (title?: string | null) =>
  title ? `/og?${new URLSearchParams({ title })}` : '/og'
