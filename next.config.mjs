import nextMDX from '@next/mdx'
import { recmaPlugins } from './mdx/recma.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { remarkPlugins } from './mdx/remark.mjs'
import withSearch from './mdx/search.mjs'

const assetPrefix = {
  development: '',
  pre: '',
  test: '',
  prod: ''
}

const nextConfig = {
  // assetPrefix: assetPrefix[process.env.INIT_ENV],
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true
    }
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins
  }
})

export default withSearch(withMDX(nextConfig))
