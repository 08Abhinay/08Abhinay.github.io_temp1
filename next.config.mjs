/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static export for GitHub Pages
  output: 'export',

  // If you prefer “/page/” folders instead of “page.html” files, uncomment:
  // trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
