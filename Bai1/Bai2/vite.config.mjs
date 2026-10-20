import { fileURLToPath } from 'node:url'
import * as compilerSfc from './Bai2/node_modules/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'

const { parse, compileScript } = compilerSfc
const appRoot = fileURLToPath(new URL('./Bai2/', import.meta.url))

export default {
  root: appRoot,
  plugins: [{
    name: 'vue-sfc-compiler',
    enforce: 'pre',
    transform(source, id) {
      if (!id.endsWith('.vue')) return null
      const { descriptor, errors } = parse(source, { filename: id })
      if (errors.length) throw errors[0]
      return compileScript(descriptor, {
        id: id.replace(/[^a-zA-Z0-9]/g, '_'),
        inlineTemplate: true
      }).content
    }
  }]
}
