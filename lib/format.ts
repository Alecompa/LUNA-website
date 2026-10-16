/** Superscript mass numbers in plain reaction strings, e.g. 14N(p,γ)15O. */
export const reactionHtml = (s: string) =>
  /<sup>/.test(s)
    ? s
    : s.replace(
        /(^|[\s()+,/·]|and )(\d{1,2})([A-Z][a-z]?)/g,
        (_, pre, a, el) => `${pre}<sup>${a}</sup>${el}`,
      );

export const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
