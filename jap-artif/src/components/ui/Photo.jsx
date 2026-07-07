/**
 * Optimized image tile. WebP, lazy-loaded and async-decoded by default so it
 * never blocks the main thread or hurts LCP. Pass `eager` for above-the-fold art.
 */
export default function Photo({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  rounded = 'rounded-card',
  eager = false,
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {/* soft studio vignette to seat the object in the layout */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(80% 70% at 50% 30%, transparent 60%, rgba(17,17,17,0.16))' }}
      />
    </div>
  )
}
