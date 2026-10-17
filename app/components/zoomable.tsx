"use client";
import { useRef } from "react";
import { X } from "lucide-react";

/** Image that opens full-size in a native <dialog>. */
export default function Zoomable({
  src,
  alt,
  caption,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => ref.current?.showModal()}
        aria-label={`Enlarge: ${alt}`}
      >
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </button>
      <dialog
        ref={ref}
        className="lightbox"
        onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      >
        <button onClick={() => ref.current?.close()} aria-label="Close">
          <X />
        </button>
        <img src={src} alt={alt} />
        {caption && <p>{caption}</p>}
      </dialog>
    </>
  );
}
