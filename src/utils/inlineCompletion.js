// Inline completion for the search input: while the customer types, the rest of the most likely name is shown inside
// the input itself (dimmed), and Tab or a click on it completes the text.
//
//   typed "duke"   -> " 390"   (completes to "duke 390")
//   typed "tourr"  -> "ad"     (completes to "tourrad")
//   typed "110/8"  -> "0 R19"  (completes to "110/80 R19")

const MIN_TYPED_LENGTH = 2;
const MAX_COMPLETION_LENGTH = 48;

// Motorcycle names are not ranked by popularity, and the shorter name is the more general one ("390 Duke" before
// "390 Adventure X"). Everything else keeps the order the search returned (sizes are already most-common first).
const SHORTEST_FIRST = new Set(['bike']);
const KIND_OF_RESULT = { Bike: 'bike', Tyre: 'product', 'Tyre Sizes': 'size' };

// "-" and "/" count as spaces when comparing, so "110 8" completes "110/80 R19". The result has the same length as the
// original text, so a position in one is the same position in the other.
const comparable = (text) => text.toLowerCase().replace(/[-/]/g, ' ');

/**
 * What would follow `typed` if it were the beginning of `name`, or null.
 *   rank 0  `name` starts with what was typed      "reise to"  in "Reise TourRad"  ->  "urRad"
 *   rank 1  what was typed starts a later word     "duke"      in "KTM Duke 390"   ->  " 390"
 */
export function continuationOf(typed, name) {
  const wanted = comparable(typed);
  const candidate = comparable(name);
  if (!wanted.trim() || candidate.length <= wanted.length) return null;

  if (candidate.startsWith(wanted)) return { rest: name.slice(wanted.length), rank: 0 };

  for (let at = candidate.indexOf(wanted, 1); at > 0; at = candidate.indexOf(wanted, at + 1)) {
    if (candidate[at - 1] !== ' ') continue; // only at the start of a word
    const end = at + wanted.length;
    return candidate.length > end ? { rest: name.slice(end), rank: 1 } : null;
  }
  return null;
}

/**
 * The names the input can be completed to, best first. Each entry is a list of ways to write the same thing
 * ("KTM 390 Duke", "Duke 390" ...) and the kind of thing it is.
 *   autocomplete  suggestions from the smart search (each has type, text and alternatives)
 *   results       items of the normal search (each may carry `completions`), used while the smart search is unavailable
 */
export function buildCompletionCandidates({ autocomplete = [], results = [] }) {
  return [
    ...autocomplete.map((item) => ({ kind: item.type, names: [item.text, ...(item.alternatives || [])] })),
    ...results.map((item) => ({ kind: KIND_OF_RESULT[item.type], names: item.completions || [] })),
  ].map(({ kind, names }) => ({ kind, names: names.filter((name) => typeof name === 'string' && name.trim()) }));
}

/**
 * @returns {{ ghost: string, full: string } | null}  `ghost` is shown after the typed text, `full` is what Tab puts in the input
 */
export function pickCompletion(typed, candidates) {
  if (typeof typed !== 'string' || typed.trim().length < MIN_TYPED_LENGTH) return null;

  let best = null;
  for (const { kind, names } of candidates) {
    for (const name of names) {
      const hit = continuationOf(typed, name);
      if (!hit || hit.rest.length > MAX_COMPLETION_LENGTH) continue;
      // The closest to what was typed wins. Between equals the earlier suggestion stays (the search already ranked them),
      // except among motorcycles, where the shorter name wins.
      const better = !best
        || hit.rank < best.rank
        || (hit.rank === best.rank && kind === best.kind && SHORTEST_FIRST.has(kind) && hit.rest.length < best.rest.length);
      if (better) best = { ...hit, kind };
    }
  }
  if (!best) return null;

  // Follow the casing the customer is using: typing in lowercase gets "reise tourrad", not "reise tourRad".
  // (Digits-only text such as "110/8" keeps the name's own letters, so a size stays "110/80 R19".)
  const typedInLowercase = /[a-z]/.test(typed) && typed === typed.toLowerCase();
  const ghost = typedInLowercase ? best.rest.toLowerCase() : best.rest;
  return { ghost, full: typed + ghost };
}
