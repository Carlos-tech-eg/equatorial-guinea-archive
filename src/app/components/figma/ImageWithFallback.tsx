'use client';

import React, { useEffect, useState } from 'react';
import {
  getFreshDownloadUrlFromFirebaseUrl,
  isFirebaseStorageDownloadUrl,
} from '@/lib/firebaseStorageImage';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeD0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function normalizeSrc(src: React.ImgHTMLAttributes<HTMLImageElement>['src']): string {
  if (src == null) return '';
  if (typeof src === 'string') return src.trim();
  return '';
}

export type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** If the main URL fails (e.g. expired Firebase token), load this URL next. */
  fallbackSrc?: string;
  /** No placeholder blocks; parent can hide the slot (e.g. gallery wall). */
  hideOnError?: boolean;
  onHidden?: () => void;
};

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const [displaySrc, setDisplaySrc] = useState('');
  const [fallbackUsed, setFallbackUsed] = useState(false);

  const { src, alt, style, className, fallbackSrc, hideOnError, onHidden, ...rest } = props;
  const safeSrc = normalizeSrc(src);
  const safeFallback = normalizeSrc(fallbackSrc);

  useEffect(() => {
    setDidError(false);
    setFallbackUsed(false);
    setDisplaySrc(safeSrc);
    if (!safeSrc || !isFirebaseStorageDownloadUrl(safeSrc)) {
      return;
    }
    let cancelled = false;
    getFreshDownloadUrlFromFirebaseUrl(safeSrc).then((fresh) => {
      if (!cancelled && fresh) setDisplaySrc(fresh);
    });
    return () => {
      cancelled = true;
    };
  }, [safeSrc]);

  const handleError = () => {
    if (safeFallback && !fallbackUsed && displaySrc !== safeFallback) {
      setFallbackUsed(true);
      setDidError(false);
      setDisplaySrc(safeFallback);
      return;
    }
    setDidError(true);
  };

  const missingSrc = !safeSrc && !safeFallback;
  const shouldHide = hideOnError && (missingSrc || didError);

  useEffect(() => {
    if (shouldHide) onHidden?.();
  }, [shouldHide, onHidden]);

  if (missingSrc) {
    if (hideOnError) return null;
    return (
      <div
        className={`block w-full min-h-[120px] bg-muted flex items-center justify-center rounded-sm ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={alt ?? 'Sin imagen'}
      />
    );
  }

  if (didError) {
    if (hideOnError) return null;
    return (
      <div
        className={`block w-full min-h-[120px] bg-muted flex items-center justify-center ${className ?? ''}`}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ERROR_IMG_SRC} alt="" className="max-w-[88px] max-h-[88px] opacity-40" />
      </div>
    );
  }

  const imgSrc = displaySrc || safeSrc || safeFallback;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- URLs externas (Firebase, Drive)
    <img
      src={imgSrc}
      alt={alt ?? ''}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}
