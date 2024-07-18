/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [
      {
        hostname: `${process.env.NEXT_SUPABASE_PROJECT_ID}.supabase.co` ,
        pathname: '/storage/v1/object/public/ecommerce/**',
        port: "",
        protocol: "https"
      }
    ]
  },
};

export default nextConfig;
