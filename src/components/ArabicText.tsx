import React from 'react';

/**
 * Reusable helper that isolates English terms, numbers, acronyms, and symbols
 * in <bdi dir="ltr"> within an Arabic sentence so that punctuation (such as parentheses,
 * full stops, commas, and hyphens) does not flip to the wrong side of the line in RTL mode.
 */
export function formatArabicWithEnglish(text: string): React.ReactNode {
  if (!text) return '';

  // Match sequences of Latin words, numbers, tech terms (e.g. "Intermediary Devices", "MAC", "IP", "Hub", "TCP/IP")
  // Matches continuous Latin tokens and multi-word Latin phrases
  const regex = /([A-Za-z0-9]+(?:[-_/.#:][A-Za-z0-9]+)*(?:\s+[A-Za-z0-9]+(?:[-_/.#:][A-Za-z0-9]+)*)*)/g;

  if (!/[A-Za-z]/.test(text)) {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (/[A-Za-z]/.test(match[0])) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index));
      }
      parts.push(
        <bdi
          key={match.index}
          dir="ltr"
          className="font-sans font-semibold text-stone-900 dark:text-stone-100 mx-0.5 inline-block"
        >
          {match[0]}
        </bdi>
      );
      lastIdx = regex.lastIndex;
    }
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
 * - Forces dir="rtl" and text-align: right
 * - Applies IBM Plex Sans Arabic / Cairo typography
 * - Applies generous 1.75 line-height
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

  return (
    <Component
      dir={dir}
      className={`font-arabic text-right leading-[1.75] text-[1.1em] text-stone-700 dark:text-zinc-300 ${className}`}
    >
      {React.Children.map(children, processNode)}
    </Component>
  );
};

export default ArabicText;
