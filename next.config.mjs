/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.emploi-public.ma',
      },
      {
        protocol: 'http',
        hostname: 'fsa-am.uiz.ac.ma',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
}

export default nextConfig