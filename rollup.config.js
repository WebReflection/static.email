import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'esm/index.js',
  plugins: [
    resolve({module: true}),
    babel({
      runtimeHelpers: true,
      presets: ['@babel/preset-env']
    }),
    terser()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'min.js',
    format: 'iife',
    name: 'StaticEmail'
  }
};
