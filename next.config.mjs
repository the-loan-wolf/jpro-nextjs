/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Allow Firebase Storage images
  },
};

export default nextConfig;
