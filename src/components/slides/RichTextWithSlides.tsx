import React from 'react';
import { SlideCitation } from './SlideCitation';
import { formatArabicWithEnglish } from '../ArabicText';

// Regular expression to match all page and slide references across English and Arabic summaries
const CITATION_REGEX = /(?:\((?:Source:\s*[^,]+,\s*)?pp?\.\s*([0-9]+)(?:[–\-]([0-9]+))?\.?\))|(?:\(المصدر:\s*[^،]+،\s*ص\s*([0-9]+)(?:[–\-]([0-9]+))?\.?\))|(?:(?:في\s+)?(?:صفحات|صفحة)\s+([0-9]+)(?:[–\-]([0-9]+))?)|(?:(?:في\s+)?صفحتي\s+([0-9]+)\s+و\s*([0-9]+))|(?:ص\s*([0-9]+)(?:[–\-]([0-9]+))?)|(?:\bpp?\.\s*([0-9]+)(?:[–\-]([0-9]+))?)/gi;

export interface RichTextWithSlidesProps {
  text: string;
  lectureId: string;
  isArabic?: boolean;
}

export const RichTextWithSlides: React.FC<RichTextWithSlidesProps> = ({
  text,
  lectureId,
  isArabic = false,
}) => {
  if (!text) return null;

  CITATION_REGEX.lastIndex = 0;
  
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = CITATION_REGEX.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = CITATION_REGEX.lastIndex;
    const fullMatch = match[0];

    // Preceding chunk
    if (matchStart > lastIndex) {
      const slice = text.slice(lastIndex, matchStart);
      nodes.push(isArabic ? formatArabicWithEnglish(slice) : slice);
    }

    // Extract startPage and endPage
    const startPageStr = match[1] || match[3] || match[5] || match[7] || match[9] || match[11];
    const endPageStr = match[2] || match[4] || match[6] || match[8] || match[10] || match[12];

    const startPage = startPageStr ? parseInt(startPageStr, 10) : NaN;
    const endPage = endPageStr ? parseInt(endPageStr, 10) : undefined;

    if (!isNaN(startPage)) {
      nodes.push(
        <SlideCitation
          key={`cite-${matchStart}`}
          displayText={fullMatch}
          startPage={startPage}
          endPage={endPage}
          lectureId={lectureId}
          isArabic={isArabic}
        />
      );
    } else {
      nodes.push(isArabic ? formatArabicWithEnglish(fullMatch) : fullMatch);
    }

    lastIndex = matchEnd;
  }

  // Trailing chunk
  if (lastIndex < text.length) {
    const rest = text.slice(lastIndex);
    nodes.push(isArabic ? formatArabicWithEnglish(rest) : rest);
  }

  return <>{nodes}</>;
};

export default RichTextWithSlides;
