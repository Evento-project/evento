/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EVENTBRITE_ID: process.env.EVENTBRITE_ID,
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    WORLD_PROJECT_ID: process.env.WORLD_PROJECT_ID,
    WORLD_APP_ID: process.env.WORLD_APP_ID
  }
}

module.exports = nextConfig
