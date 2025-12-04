/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",              // frontend calls /api/*
        destination: "http://localhost:23176/:path*", // backend NestJS server
      },
    ];
  },
  // Turbopack root set to project directory to avoid workspace root warnings
  turbopack: {
    root: './',
  },
};

module.exports = nextConfig;
