import { splitHighlight } from '@/utils/searchDropdown';

/** Emphasises the part of a suggestion the customer has already typed. */
export default function HighlightedText({ text, query, highlightClassName = 'text-orange-400' }) {
  return splitHighlight(text, query).map((piece, i) =>
    piece.match
      ? <span key={i} className={`font-extrabold ${highlightClassName}`}>{piece.text}</span>
      : <span key={i}>{piece.text}</span>
  );
}
