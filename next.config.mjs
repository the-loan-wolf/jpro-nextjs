import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Allow Firebase Storage images
  },
  // experimental: {
  //   reactCompiler: true,
  // },
};

export default MillionLint.next({ rsc: true })(nextConfig);
