import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(staticExport
    ? {
        output: "export",
        basePath: "/MandateTalent",
        assetPrefix: "/MandateTalent",
        images: { unoptimized: true },
        // The interest API is a Route Handler (route.ts). Static export cannot
        // publish it. Local server builds keep the default extensions so the
        // handler stays available.
        pageExtensions: ["tsx", "jsx"],
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
        turbopack: {
          rules: {
            "*.css": {
              loaders: ["@tailwindcss/turbopack"],
              as: "*.css",
            },
          },
        },
      }),
};

export default nextConfig;
