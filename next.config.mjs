/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const subBasePath = '/Promptopia'
const subAssetPrefix = subBasePath + '/'
const nextConfig = {
  basePath: isProd ? subBasePath : '',
  assetPrefix: isProd ? subAssetPrefix : '',
  publicRuntimeConfig: {
    basePath: isProd ? subBasePath : '',
    assetPrefix: isProd ? subAssetPrefix : ''
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

export default nextConfig
