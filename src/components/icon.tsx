// Paths copied from the humbleicons package (MIT). Do not redraw.
const glyphs = {
  "user": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M18 19v-1.25c0-2.071-1.919-3.75-4.286-3.75h-3.428C7.919 14 6 15.679 6 17.75V19m9-11a3 3 0 11-6 0 3 3 0 016 0z\" />",
  "users": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 19v-1.25C13 15.679 11.081 14 8.714 14H7.286C4.919 14 3 15.679 3 17.75V19m12.286-5h1.428C19.081 14 21 15.679 21 17.75V19M15 5.17a3 3 0 110 5.659M11 8a3 3 0 11-6 0 3 3 0 016 0z\" />",
  "building": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.5 7.99V8m5-.02v.01M10.5 20H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.5m-3 0v-4h3v4m-3 0h3m-4-8.02v.01m5 0V12\" />",
  "briefcase": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" d=\"M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2\" />\n  <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" d=\"M4 14l3.15.787a20 20 0 009.7 0L20 14\" />\n  <path stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 10a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z\" />\n  <circle cx=\"12\" cy=\"12\" r=\"1\" fill=\"currentColor\" />",
  "calendar": "<g stroke=\"currentColor\" stroke-width=\"2\">\n    <path stroke-linejoin=\"round\" d=\"M4 6a1 1 0 011-1h14a1 1 0 011 1v4H4V6z\" />\n    <path stroke-linecap=\"round\" d=\"M8 6.5v-3\" />\n    <path stroke-linecap=\"round\" d=\"M16 6.5v-3\" />\n    <path stroke-linejoin=\"round\" d=\"M4 10h16v9a1 1 0 01-1 1H5a1 1 0 01-1-1v-9z\" />\n  </g>",
  "document": "<g stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\">\n    <path d=\"M5 20V4a1 1 0 011-1h6.172a2 2 0 011.414.586l4.828 4.828A2 2 0 0119 9.828V20a1 1 0 01-1 1H6a1 1 0 01-1-1z\" />\n    <path d=\"M12 3v6a1 1 0 001 1h6\" />\n  </g>",
  "check": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 14L9 18L19 8\" />",
  "arrow-right": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 12h16m0 0l-6 6m6-6l-6-6\"/>",
  "mail": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7m18 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1m18 0-7.72 6.433a2 2 0 0 1-2.56 0L3 7\" />",
  "location": "<path stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z\" />\n  <path stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.5 9.5c0 3.038-2 6.5-5.5 10.5-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z\" />",
  "clock": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 6.5V12l3.5 2m5.5-2a9 9 0 11-18 0 9 9 0 0118 0z\" />",
  "layers": "<g stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\">\n    <path d=\"M4 8l8-4 8 4-8 4-8-4z\" />\n    <path stroke-linecap=\"round\" d=\"M4 12l8 4 8-4\" />\n    <path stroke-linecap=\"round\" d=\"M4 16l8 4 8-4\" />\n  </g>",
  "shield-check": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m9 13 2.5 2 3.5-5m-3-6s2 2 7 2v7.226a5.997 5.997 0 0 1-2.755 5.045L12 21l-4.245-2.729A5.999 5.999 0 0 1 5 13.225V6c5 0 7-2 7-2Z\" />",
  "clipboard": "<path stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 4H6a1 1 0 00-1 1v15a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1h-3M9 3h6v4H9V3z\" />",
  "info-circle": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 11h1v5.5m0 0h1.5m-1.5 0h-1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9.5-4v-.5h.5V8h-.5Z\"/>",
  "chevron-down": "<path stroke-linecap=\"round\" stroke-width=\"2\" d=\"M5 10l7 7 7-7\" />",
  "arrow-join": "<path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m21 12-3-3m3 3-3 3m3-3h-5.929a5 5 0 0 0-3.535 1.464l-1.072 1.072A5 5 0 0 1 6.93 16H3m0-8h4.343a4 4 0 0 1 2.829 1.172l1.656 1.656A4 4 0 0 0 14.657 12H18\"/>",
} as const;

export type IconName = keyof typeof glyphs;

export function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: 16 | 20 | 24;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: glyphs[name] }}
    />
  );
}
