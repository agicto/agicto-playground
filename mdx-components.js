import * as mdxComponents from './src/components/common/mdx'

export function useMDXComponents(components) {
  return {
    ...components,
    ...mdxComponents
  }
}
