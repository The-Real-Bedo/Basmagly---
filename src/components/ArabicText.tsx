import React from 'react';

const ARABIC_RE = /[\u0600-\u06FF]/;

/** True when the string contains at least one Arabic letter. */
export const hasArabic = (text: string): boolean => ARABIC_RE.test(text);

// One Latin token: optional leading dot (".NET"), then letters/digits with
// inner separators ("TCP/IP", "192.168.1.10", "FF:FF:FF", "Wi-Fi", "C#", "C++", "75°C").
const LATIN_TOKEN = String.raw`\.?[A-Za-z0-9][A-Za-z0-9+#°%]*(?:[-_/.:][A-Za-z0-9+#°%]+)*`;
// Tokens joined by spaces or by ", ", " & ", " / " form one phrase
// ("Network Components, Classifications & Topologies") so they never reorder in RTL.
const LATIN_JOINER = String.raw`(?:[ \t]+|[ \t]*[,&/][ \t]+)`;
const LATIN_PHRASE = String.raw`${LATIN_TOKEN}(?:${LATIN_JOINER}${LATIN_TOKEN})*`;
// A phrase wrapped in parentheses is captured together with its parentheses, and a
// phrase followed by a parenthetical ("Edge (3ms)") stays one run, so brackets never
// detach from the term or reorder in RTL.
const LATIN_PAREN = String.raw`\([ \t]*${LATIN_PHRASE}[ \t]*\)`;
const LATIN_RUN_RE = new RegExp(
  String.raw`(?:${LATIN_PAREN}|${LATIN_PHRASE})(?:[ \t]*${LATIN_PAREN})*`,
  'g'
);

/**
 * Isolates English terms, numbers, acronyms and symbols inside an Arabic sentence in
 * <bdi dir="ltr"> so punctuation (parentheses, full stops, commas, hyphens) does not
 * flip to the wrong side of the line in RTL mode.
 */
export function formatArabicWithEnglish(text: string): React.ReactNode {
  if (!text) return '';
  if (!/[A-Za-z]/.test(text)) return text;

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  LATIN_RUN_RE.lastIndex = 0;

  while ((match = LATIN_RUN_RE.exec(text)) !== null) {
    // Bare numbers stay in the Arabic run; only wrap runs that contain Latin letters.
    if (!/[A-Za-z]/.test(match[0])) continue;
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }
    // Color is inherited on purpose so terms stay readable on dark/inverted surfaces.
    parts.push(
      <bdi key={match.index} dir="ltr" className="font-sans font-semibold mx-0.5">
        {match[0]}
      </bdi>
    );
    lastIdx = LATIN_RUN_RE.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts.length > 0 ? parts : text;
}

interface ArabicTextProps {
  children?: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'li';
  dir?: 'rtl' | 'ltr';
}

/**
 * ArabicText Component
 * - Forces dir="rtl" and text-align: right (override with text-center/text-left via className)
 * - Applies IBM Plex Sans Arabic / Cairo typography with 1.75 line-height
 * - Automatically wraps embedded English terms in <bdi dir="ltr"> to prevent punctuation flips
 */
export const ArabicText: React.FC<ArabicTextProps> = ({
  children,
  className = '',
  as: Component = 'p',
  dir = 'rtl',
}) => {
  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return formatArabicWithEnglish(node);
    }
    return node;
  };

  // Default colour lives in the `arabic-text` component class (index.css) so that any
  // text-* colour utility passed via className reliably overrides it.
  return (
    <Component dir={dir} className={`arabic-text font-arabic ${className}`}>
      {React.Children.map(children, processNode)}
    </Component>
  );
};

export default ArabicText;
