/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [
      {
        hostname: `${process.env.NEXT_SUPABASE_PROJECT_ID}.supabase.co` ,
        pathname: '/storage/v1/object/public/ecommerce/**',
        port: "",
        protocol: "https"
      },
      {
        hostname: `127.0.0.1` ,
        pathname: '/storage/v1/object/public/ecommerce/**',
        port: "54321",
        protocol: "http"
      }
    ]
  },
};

export default nextConfig;
