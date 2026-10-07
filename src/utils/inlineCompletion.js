const MIN_TYPED_LENGTH = 2;
const MAX_COMPLETION_LENGTH = 48;

const SHORTEST_FIRST = new Set(['bike']);
const KIND_OF_RESULT = { Bike: 'bike', Tyre: 'product', 'Tyre Sizes': 'size' };

const comparable = (text) => text.toLowerCase().replace(/[-/]/g, ' ');

export function continuationOf(typed, name) {
  const wanted = comparable(typed);
  const candidate = comparable(name);
  if (!wanted.trim() || candidate.length <= wanted.length) return null;

  if (candidate.startsWith(wanted)) return { rest: name.slice(wanted.length), rank: 0 };

  for (let at = candidate.indexOf(wanted, 1); at > 0; at = candidate.indexOf(wanted, at + 1)) {
    if (candidate[at - 1] !== ' ') continue; 
    const end = at + wanted.length;
    return candidate.length > end ? { rest: name.slice(end), rank: 1 } : null;
  }
  return null;
}


export function buildCompletionCandidates({ autocomplete = [], results = [] }) {
  return [
    ...autocomplete.map((item) => ({ kind: item.type, names: [item.text, ...(item.alternatives || [])] })),
    ...results.map((item) => ({ kind: KIND_OF_RESULT[item.type], names: item.completions || [] })),
  ].map(({ kind, names }) => ({ kind, names: names.filter((name) => typeof name === 'string' && name.trim()) }));
}

export function pickCompletion(typed, candidates) {
  if (typeof typed !== 'string' || typed.trim().length < MIN_TYPED_LENGTH) return null;

  let best = null;
  for (const { kind, names } of candidates) {
    for (const name of names) {
      const hit = continuationOf(typed, name);
      if (!hit || hit.rest.length > MAX_COMPLETION_LENGTH) continue;
   const better = !best
        || hit.rank < best.rank
        || (hit.rank === best.rank && kind === best.kind && SHORTEST_FIRST.has(kind) && hit.rest.length < best.rest.length);
      if (better) best = { ...hit, kind };
    }
  }
  if (!best) return null;

 const typedInLowercase = /[a-z]/.test(typed) && typed === typed.toLowerCase();
  const ghost = typedInLowercase ? best.rest.toLowerCase() : best.rest;
  return { ghost, full: typed + ghost };
}
