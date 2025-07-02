// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';
import { readFileSync } from 'node:fs';

const pkgJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

export default defineConfig({
  input: 'index.ts',
  output: [
    {
      format: 'esm',
      file: pkgJson.module,
      sourcemap: true,
    },
    {
      format: 'cjs',
      file: pkgJson.main,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      allowSyntheticDefaultImports: true,
      sourceMap: true,
    }),
  ],
});
