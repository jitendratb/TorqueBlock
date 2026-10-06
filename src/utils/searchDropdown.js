// What the search box dropdown shows, built from two sources:
//   completions  search-as-you-type suggestions from the smart search (brands, motorcycles, tyre families, sizes)
//   results      the broader search (tyres with their size cards, sizes, blogs, featured items, tubes ...)
//
// Completions come first. A result that points to the same page as a completion is merged into it, so nothing is
// listed twice and the tyre row keeps its size cards.

/** Paths from an API response end up in <Link> / router.push: only same-site paths are ever followed. */
export function safePath(path) {
  if (typeof path !== 'string') return null;
  if (!path.startsWith('/') || path.startsWith('//') || /[\s\\]/.test(path)) return null;
  return path;
}

const searchHref = (text) => `/search?q=${encodeURIComponent(text)}`;

/** The pill shown at the end of a row. */
export function badgeFor(type) {
  switch (type) {
    case 'Tyre Sizes':
      return 'Size';
    case 'Trending':
      return 'Featured';
    case 'Bike':
      return 'Motorcycle';
    case 'Tubes':
      return 'Tube';
    default:
      return type;
  }
}

/** One completion from GET /smart-search/suggest -> a row. */
function completionToRow(item) {
  const label = item.text || item.query || '';
  switch (item.type) {
    case 'bike':
      return {
        type: 'Bike',
        label,
        href: item.identifier ? `/motorcycles/${encodeURIComponent(item.identifier)}` : searchHref(item.query || label),
      };
    case 'brand':
      return { type: 'Brand', label, href: item.id ? `/brands/${encodeURIComponent(item.id)}` : searchHref(item.query || label) };
    case 'product': {
      const path = safePath(item.path);
      const isSpecificTyre = path ? path.split('/').filter(Boolean).length > 2 : false; // /tyres/<family>/<size>
      return { type: isSpecificTyre ? 'Tyre Sizes' : 'Tyre', label, href: path || searchHref(item.query || label) };
    }
    default: // a size, e.g. "REISE 120/70 R17"
      return { type: 'Tyre Sizes', label, href: searchHref(item.query || label) };
  }
}

/**
 * @param autocomplete   completions from the smart search (may be empty when it is unavailable)
 * @param results        items of the broader search, as returned by useSearchStore().getSuggestions()
 * @param getResultHref  (type, identifier, item) => href, the same function the search box uses for its links
 */
export function buildDropdownRows({ autocomplete = [], results = [], getResultHref }) {
  const resultRows = results.map((item) => ({
    ...item,
    source: 'result',
    href: getResultHref(item.type, item.identifier, item),
    badge: badgeFor(item.type),
  }));

  const firstResultAt = new Map();
  resultRows.forEach((row) => {
    if (!firstResultAt.has(row.href)) firstResultAt.set(row.href, row);
  });

  const merged = new Set();
  const seen = new Set();
  const completionRows = [];
  for (const item of autocomplete) {
    const base = completionToRow(item);
    const identity = `${base.href}|${base.label}`;
    if (!base.label || seen.has(identity)) continue;
    seen.add(identity);

    const same = firstResultAt.get(base.href);
    if (same) merged.add(same);
    completionRows.push({
      ...(same || {}), // keeps the size cards / images of a tyre result
      ...base,
      identifier: same?.identifier ?? item.identifier,
      source: 'completion',
      badge: badgeFor(base.type),
    });
  }

  return [...completionRows, ...resultRows.filter((row) => !merged.has(row))].map((row, index) => ({
    ...row,
    key: `${row.source}-${index}-${row.href}`,
  }));
}

/** Splits a label so the part the customer typed can be emphasised: "Reise TourRad" + "tourr" -> Reise | TourR | ad */
export function splitHighlight(text, query) {
  const label = String(text ?? '');
  const words = [...new Set(String(query ?? '').toLowerCase().match(/[a-z0-9]+/g) || [])].sort((a, b) => b.length - a.length);
  if (!label || !words.length) return [{ text: label, match: false }];

  // typed words are matched at the start of a word only, so "r" does not light up every r in the label
  const pieces = label.split(new RegExp(`\\b(${words.join('|')})`, 'gi'));
  return pieces.map((piece, i) => ({ text: piece, match: i % 2 === 1 })).filter((piece) => piece.text);
}
