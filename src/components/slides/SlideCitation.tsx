import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Maximize2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { SLIDE_CONFIGS, getSlideUrl } from '../../data/slidesConfig';
import { SlidePreviewModal } from './SlidePreviewModal';
import { ArabicText } from '../ArabicText';

interface SlideCitationProps {
  displayText: string;
  startPage: number;
  endPage?: number;
  lectureId: string;
  isArabic?: boolean;
}

export const SlideCitation: React.FC<SlideCitationProps> = ({
  displayText,
  startPage,
  endPage,
  lectureId,
  isArabic = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(startPage);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; placement: 'top' | 'bottom' } | null>(null);

  const badgeRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<any>(null);
  const closeTimeoutRef = useRef<any>(null);

  const config = SLIDE_CONFIGS[lectureId];
  const maxPage = config?.pageCount || 30;
  const hasRange = endPage !== undefined && endPage > startPage;

  // Compute fixed position on document.body
  const updatePosition = () => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const popoverWidth = 360;
    const popoverHeight = 270;

    let placement: 'top' | 'bottom' = 'top';
    let top = rect.top - popoverHeight - 10;

    if (top < 12) {
      placement = 'bottom';
      top = rect.bottom + 10;
    }

    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    // Clamp to viewport
    const minLeft = 12;
    const maxLeft = window.innerWidth - popoverWidth - 12;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    setPopoverPos({ top, left, placement });
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsHovered(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 250);
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [activePage, lectureId]);

  const slideUrl = getSlideUrl(lectureId, activePage);

  return (
    <>
      {/* Inline Citation Badge */}
      <button
        ref={badgeRef}
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setIsHovered(false);
          setIsModalOpen(true);
        }}
        className={`inline-flex items-center gap-1 font-mono text-[12px] font-bold px-1.5 py-0.5 mx-0.5 rounded-md border transition-all cursor-pointer align-baseline select-none shadow-2xs group ${
          isHovered
            ? 'bg-amber-200/90 dark:bg-amber-900/80 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-100 ring-2 ring-amber-400/30'
            : 'bg-amber-100/70 hover:bg-amber-200/80 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 border-amber-300/60 dark:border-amber-800/60 text-amber-900 dark:text-amber-200'
        }`}
        title="انقر لعرض شريحة المحاضرة الأصلية"
      >
        <Eye className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
        <span>{displayText}</span>
      </button>

      {/* Floating Hover Popover via Portal */}
      {isHovered && popoverPos && typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'fixed',
            top: `${popoverPos.top}px`,
            left: `${popoverPos.left}px`,
            width: '360px',
            zIndex: 9999,
          }}
          className="rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-stone-100 dark:bg-stone-800/90 border-b border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="font-bold text-xs text-stone-800 dark:text-stone-200">
                {config?.title || 'Slide Preview'}
              </span>
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold">
                p. {activePage}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              {hasRange && (
                <div className="flex items-center gap-0.5 mr-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(p => Math.max(startPage, p - 1));
                    }}
                    disabled={activePage <= startPage}
                    className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 text-stone-700 dark:text-stone-300"
                    title="الشريحة السابقة"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] text-stone-500">
                    {activePage - startPage + 1}/{endPage! - startPage + 1}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePage(p => Math.min(endPage!, p + 1));
                    }}
                    disabled={activePage >= endPage!}
                    className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 text-stone-700 dark:text-stone-300"
                    title="الشريحة التالية"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsHovered(false);
                  setIsModalOpen(true);
                }}
                className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                title="عرض بالحجم الكامل"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slide Preview Image */}
          <div
            onClick={() => {
              setIsHovered(false);
              setIsModalOpen(true);
            }}
            className="relative w-full h-[210px] bg-stone-950 flex items-center justify-center cursor-pointer group"
          >
            {!imageLoaded && (
              <div className="absolute inset-0 bg-stone-900 animate-pulse flex items-center justify-center">
                <span className="font-mono text-xs text-stone-500">Loading slide {activePage}...</span>
              </div>
            )}
            <img
              src={slideUrl}
              alt={`Slide ${activePage}`}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-contain transition-all duration-200 ${
                imageLoaded ? 'opacity-100 group-hover:scale-[1.02]' : 'opacity-0'
              }`}
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
              <Maximize2 className="w-4 h-4" />
              <span>اضغط للتكبير والعرض بالحجم الكامل</span>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fullscreen Lightbox Modal */}
      <SlidePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lectureId={lectureId}
        initialPage={activePage}
        pageRange={hasRange ? [startPage, endPage!] : undefined}
      />
    </>
  );
};
