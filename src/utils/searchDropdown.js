export function safePath(path) {
  if (typeof path !== 'string') return null;
  if (!path.startsWith('/') || path.startsWith('//') || /[\s\\]/.test(path)) return null;
  return path;
}

const searchHref = (text) => `/search?q=${encodeURIComponent(text)}`;

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
    default:
      return { type: 'Tyre Sizes', label, href: searchHref(item.query || label) };
  }
}

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
      ...(same || {}), 
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

export function splitHighlight(text, query) {
  const label = String(text ?? '');
  const words = [...new Set(String(query ?? '').toLowerCase().match(/[a-z0-9]+/g) || [])].sort((a, b) => b.length - a.length);
  if (!label || !words.length) return [{ text: label, match: false }];


  const pieces = label.split(new RegExp(`\\b(${words.join('|')})`, 'gi'));
  return pieces.map((piece, i) => ({ text: piece, match: i % 2 === 1 })).filter((piece) => piece.text);
}
