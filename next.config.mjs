/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: every page (including each assignment detail page)
  // is pre-rendered at build time into the `out/` folder.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
