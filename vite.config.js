import { defineConfig } from "vituum";
import { resolve } from "path";
import { path } from "./config/gulp-settings.js";
import pug from '@vituum/pug';
import autoprefixer from "autoprefixer";
import sortMediaQueries from 'postcss-sort-media-queries';
import postcssShort from 'postcss-short'
import cssnanoPlugin from "cssnano"
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel"
import resolvePlugin from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	root: resolve(process.cwd(), path.srcFolder),
	output: resolve(process.cwd(), path.buildFolder),
	build: {
		log: true,
		manifest: false,
		sourcemap: !process.argv.includes('--mode=production'),
	},
	server: {
		open: false,
	},
	templates: {
		format: 'pug',
	},
	imports: {
		paths: [
			resolve(process.cwd(), `${path.src.styles}/**`),
			resolve(process.cwd(), `${path.src.scripts}/**`),
		],
		filenamePattern: {
			"_all.sass": resolve(process.cwd(), path.src.styles),
			"_all.js": resolve(process.cwd(), path.src.scripts),
		},
	},
	postcss: {
		plugins: process.argv.includes('--mode=production') ? [autoprefixer, sortMediaQueries, cssnanoPlugin, postcssShort] : [],
	},
	integrations: [
		pug({
			root: resolve(process.cwd(), path.src.templates),
			globals: {
				isDev: !process.argv.includes('--mode=production'),
				projectName: `${path.rootFolder}`,
				img: "./img",
			},
			pug: {
				pretty: true,
			}
		})
	],
	plugins: [
		eslint(
			{
				lintOnStart: true,
				include: `${path.src.scripts}/**/*.js`,
				failOnError: false,
				fix: process.argv.includes('--mode=production'),
			}
		),
		replace({
			preventAssignment: true,
			include: [
				resolve(process.cwd(), `${path.srcFolder}/**/*.{sass,scss,css,js}`),
			],
			values: {
				img: `../img`,
			},
			delimiters: ["@", ""],
		}),
		alias({
			entries: [
				{
					find: "@styles",
					replacement: resolve(process.cwd(), path.src.styles),
				},
				{
					find: "@scripts",
					replacement: resolve(process.cwd(), path.src.scripts),
				},
				{
					find: "@templates",
					replacement: resolve(process.cwd(), path.src.templates),
				},
				{
					find: "@img",
					replacement: resolve(process.cwd(), `${path.buildFolder}/img`),
				},
			],
		}),
	],
	vite: {
		base: '',
		server: {
			port: "8080",
		},
		css: {
			devSourcemap: true,
			preprocessorOptions: {
				sass: {
					additionalData: process.argv.includes('--mode=production') ? '$isDev: false\n' : '$isDev: true\n',
				},
			},
		},
		build: {
			modulePreload: false,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes("node_modules")) {
							return "vendor";
						}
					},
					chunkFileNames: "scripts/[name].js",
					entryFileNames: "scripts/[name].js",
					assetFileNames: ({ name }) => {
						if (/\.css$/.test(name ?? "")) {
							return "styles/[name].css"
						}
						return "assets/[name].[extname]"
					},
				},
				plugins: process.argv.includes('--mode=production') ? [resolvePlugin(), commonjs(), babel({ babelHelpers: 'bundled' }), terser()] : []
			},
		},
	},
})
