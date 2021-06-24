import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/main.ts',
	plugins: [
		typescript({ tsconfig: './tsconfig.json' }) // so Rollup can convert TypeScript to JavaScript
	],
	output: { 
		file: 'dist/main.js', 
		format: 'cjs',
		sourcemap: true
	},
};