/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          pathname: '/**',
        },

        // Add more patterns as needed
      ],
    },
  };
  
  export default nextConfig;
  