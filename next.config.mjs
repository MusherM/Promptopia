/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === 'production'
const isProd = false
const subBasePath = '/Promptopia'
const subAssetPrefix = subBasePath + '/'
const nextConfig = {
  // output: 'export',
  basePath: isProd ? subBasePath : '',
  assetPrefix: isProd ? subAssetPrefix : '',
  publicRuntimeConfig: {
    basePath: isProd ? subBasePath : '',
    assetPrefix: isProd ? subAssetPrefix : ''
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    missingSuspenseWithCSRBailout: false
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true
  }
}

export default nextConfig
