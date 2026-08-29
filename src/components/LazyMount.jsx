import { useEffect, useRef, useState, Suspense, lazy } from 'react';

// Combines React.lazy (code-splitting: a separate JS chunk, not bundled
// into the initial load) with an IntersectionObserver gate, so heavy
// components — canvas render loops, network fetches — don't even start
// downloading or executing until the user has scrolled near them.
export default function LazyMount({ importer, minHeight = 320, componentProps = {}, className, style }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const LazyComp = useRef(null);
  if (!LazyComp.current) LazyComp.current = lazy(importer);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ...(visible ? null : { minHeight }) }}
    >
      {visible && (
        <Suspense fallback={<div className="lazy-fallback" style={{ minHeight }} />}>
          <LazyComp.current {...componentProps} />
        </Suspense>
      )}

      <style>{`
        .lazy-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-data);
          font-size: 11px;
          color: var(--ink-faint);
          letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  );
}
