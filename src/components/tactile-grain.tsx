const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Slate ground + fine noise grain (subtle paper texture).
 */
export function TactileGrain() {
  return (
    <div className="page-atmosphere" aria-hidden="true">
      <div
        className="page-atmosphere__hero"
        style={{
          backgroundImage: `url(${basePath}/brand/hero-atmosphere.jpg)`,
        }}
      />
      <div className="page-atmosphere__grain" />
    </div>
  );
}
