/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // static export
  // trailingSlash: true,  // optional
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};

export default nextConfig;
