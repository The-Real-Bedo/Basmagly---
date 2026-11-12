import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, FileText, Maximize2 } from 'lucide-react';
import { SLIDE_CONFIGS, getSlideUrl } from '../../data/slidesConfig';
import { ArabicText } from '../ArabicText';

interface SlidePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lectureId: string;
  initialPage: number;
  pageRange?: [number, number];
}

export const SlidePreviewModal: React.FC<SlidePreviewModalProps> = ({
  isOpen,
  onClose,
  lectureId,
  initialPage,
  pageRange,
}) => {
  const config = SLIDE_CONFIGS[lectureId];
  const maxPage = config?.pageCount || 30;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage);
      setZoomLevel(1);
      setImageLoaded(false);
    }
  }, [isOpen, initialPage]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentPage(p => Math.min(maxPage, p + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage(p => Math.max(1, p - 1));
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel(z => Math.min(2.5, z + 0.25));
      } else if (e.key === '-') {
        setZoomLevel(z => Math.max(0.75, z - 0.25));
      } else if (e.key === '0') {
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, maxPage, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const slideUrl = getSlideUrl(lectureId, currentPage);

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex flex-col bg-stone-950/90 backdrop-blur-md text-stone-100 select-none animate-in fade-in duration-200"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-stone-800 bg-stone-900/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-stone-100">
                {config?.title || 'Lecture Slides'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                Slide {currentPage} / {maxPage}
              </span>
            </div>
            <ArabicText className="text-xs text-stone-400">
              {config?.titleAr || 'سلايدات المحاضرة'} — المصدر: {config?.sourceDocName || 'PDF'}
            </ArabicText>
          </div>
        </div>

        {/* Zoom & Close controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-stone-800/80 rounded-xl p-1 border border-stone-700">
            <button
              onClick={() => setZoomLevel(z => Math.max(0.75, z - 0.25))}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Zoom out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 text-stone-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(z => Math.min(2.5, z + 0.25))}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Zoom in (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              title="Reset zoom (0)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors border border-stone-700"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 relative"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Navigation arrow left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentPage(p => Math.max(1, p - 1));
          }}
          disabled={currentPage <= 1}
          className={`absolute left-3 sm:left-6 z-10 p-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-white shadow-xl transition-all ${
            currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'
          }`}
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slide Canvas Container */}
        <div
          className="relative max-w-5xl max-h-[82vh] transition-transform duration-150"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {!imageLoaded && (
            <div className="w-[800px] max-w-[85vw] h-[550px] max-h-[70vh] rounded-2xl bg-stone-900 animate-pulse border border-stone-800 flex items-center justify-center">
              <span className="font-mono text-sm text-stone-500">Loading slide {currentPage}...</span>
            </div>
          )}
          <img
            key={slideUrl}
            src={slideUrl}
            alt={`Slide ${currentPage}`}
            onLoad={() => setImageLoaded(true)}
            className={`max-w-[88vw] max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-stone-800 bg-white transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
            }`}
          />
        </div>

        {/* Navigation arrow right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentPage(p => Math.min(maxPage, p + 1));
          }}
          disabled={currentPage >= maxPage}
          className={`absolute right-3 sm:right-6 z-10 p-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-white shadow-xl transition-all ${
            currentPage >= maxPage ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'
          }`}
          title="Next slide (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar: Slide scrubber / Page chips */}
      <div className="px-4 py-3 border-t border-stone-800/90 bg-stone-950/95 flex items-center justify-center gap-2 overflow-x-auto">
        <span className="text-xs font-mono font-semibold text-stone-400 mr-2 shrink-0">
          Slides · الشرائح:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-2xl py-1.5 px-2">
          {Array.from({ length: maxPage }, (_, i) => i + 1).map(pageNum => {
            const isSelected = pageNum === currentPage;
            const inRange = pageRange && pageNum >= pageRange[0] && pageNum <= pageRange[1];
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`min-w-[32px] h-8 px-2 rounded-lg font-mono text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-stone-100 text-stone-900 shadow-md font-extrabold scale-110 ring-2 ring-stone-300'
                    : inRange
                    ? 'bg-stone-800 text-stone-200 border border-stone-600 hover:bg-stone-700 hover:text-white'
                    : 'bg-stone-900/90 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};
