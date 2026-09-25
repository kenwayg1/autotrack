export const SITE_NAME    = "AutoTrack";
export const SITE_TAGLINE = "Stories, logged as they happen.";

export const CATEGORIES = [
  { slug: "news",          label: "News" },
  { slug: "politics",      label: "Politics" },
  { slug: "business",      label: "Business" },
  { slug: "sports",        label: "Sports" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "world",         label: "World" },
];

export function categoryLabel(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
