"use client";

import { useEffect, useRef, useState } from "react";

interface PdfViewerProps {
  src: string;
  className?: string;
}

export default function PdfViewer({ src, className = "" }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const doc = await pdfjsLib.getDocument(src).promise;
        const page = await doc.getPage(1);

        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const containerWidth = canvas.parentElement?.clientWidth || 800;
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.render({ canvasContext: ctx, viewport } as any).promise;
        setLoading(false);
      } catch (e) {
        console.error("PDF render error:", e);
        if (!cancelled) setError(true);
        setLoading(false);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl ${className}`}>
        <p className="text-gray-500 mb-4">לא ניתן להציג את הקובץ כאן</p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-navy-light transition-colors text-sm"
        >
          פתח PDF
        </a>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl">
          <div className="w-8 h-8 border-3 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-xl shadow-inner"
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
}
