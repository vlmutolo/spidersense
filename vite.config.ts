import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';

const wasmInput = [
	'Cargo.toml',
	'Cargo.lock',
	'rust-toolchain.toml',
	'crates/**/Cargo.toml',
	'crates/**/*.rs'
];
const wasmOutput = ['src/lib/wasm/**'];

export default defineConfig({
	run: {
		tasks: {
			audit: {
				command: 'vp pm audit -- --audit-level high',
				cache: false
			},
			build: {
				command: 'vp build',
				dependsOn: ['build:wasm', 'gen:check'],
				input: [
					'.node-version',
					'package.json',
					'pnpm-lock.yaml',
					'pnpm-workspace.yaml',
					'src/**',
					'static/**',
					'tsconfig.json',
					'vite.config.ts',
					'worker-configuration.d.ts',
					'wrangler.jsonc'
				],
				output: ['.svelte-kit/**']
			},
			'build:wasm': {
				command:
					'wasm-pack build crates/spidersense-wasm --target web --out-dir ../../src/lib/wasm --out-name spidersense_wasm --release',
				input: wasmInput,
				output: wasmOutput
			},
			'build:wasm:dev': {
				command:
					'wasm-pack build crates/spidersense-wasm --target web --out-dir ../../src/lib/wasm --out-name spidersense_wasm --dev',
				input: wasmInput,
				output: wasmOutput
			},
			check: {
				command: [
					'vp check',
					'cargo fmt --check',
					'cargo clippy --workspace --all-targets -- -D warnings',
					'vp exec svelte-check --tsconfig ./tsconfig.json'
				],
				dependsOn: ['check:prepare'],
				output: []
			},
			'check:prepare': {
				command: 'vp exec svelte-kit sync',
				dependsOn: ['build:wasm:dev', 'gen:check'],
				output: ['.svelte-kit/**']
			},
			'check:watch': {
				command: 'vp exec svelte-check --tsconfig ./tsconfig.json --watch',
				dependsOn: ['check:prepare'],
				cache: false
			},
			clean: {
				command:
					"node -e \"require('node:fs').rmSync('.svelte-kit', { recursive: true, force: true })\"",
				cache: false
			},
			deploy: {
				command: 'vp exec wrangler deploy',
				cache: false
			},
			dev: {
				command: 'vp dev',
				dependsOn: ['build:wasm:dev'],
				cache: false
			},
			'dev:e2e': {
				command: 'vp dev --host 127.0.0.1 --port 4173',
				dependsOn: ['build:wasm:dev'],
				cache: false
			},
			format: {
				command: ['vp fmt .', 'cargo fmt'],
				cache: false
			},
			gen: {
				command: 'vp exec wrangler types',
				cache: false
			},
			'gen:check': {
				command: 'vp exec wrangler types --check',
				dependsOn: ['clean'],
				output: []
			},
			preview: {
				command: 'vp exec wrangler dev .svelte-kit/cloudflare/_worker.js --port 4173',
				dependsOn: ['build'],
				cache: false
			},
			'test:contracts': {
				command: 'vp test --passWithNoTests',
				dependsOn: ['check:prepare'],
				output: []
			},
			'test:e2e': {
				command: 'vp exec playwright test --pass-with-no-tests',
				cache: false
			}
		}
	},
	lint: {
		plugins: ['oxc', 'typescript', 'unicorn'],
		jsPlugins: [
			'eslint-plugin-svelte',
			{
				name: 'vite-plus',
				specifier: 'vite-plus/oxlint-plugin'
			}
		],
		categories: {
			correctness: 'error'
		},
		env: {
			builtin: true,
			browser: true,
			node: true
		},
		ignorePatterns: [
			'node_modules/',
			'**/scratch/',
			'target/',
			'src/lib/wasm/',
			'playwright-report/',
			'test-results/',
			'**/.output',
			'**/.vercel',
			'**/.netlify',
			'**/.wrangler',
			'.svelte-kit',
			'build',
			'**/.DS_Store',
			'**/Thumbs.db',
			'**/.env',
			'**/.env.*',
			'!**/.env.example',
			'!**/.env.test',
			'**/vite.config.js.timestamp-*',
			'**/vite.config.ts.timestamp-*',
			'worker-configuration.d.ts'
		],
		rules: {
			'svelte/comment-directive': 'error',
			'svelte/infinite-reactive-loop': 'error',
			'svelte/no-at-debug-tags': 'warn',
			'svelte/no-at-html-tags': 'error',
			'svelte/no-dom-manipulating': 'error',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dupe-on-directives': 'error',
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-dupe-use-directives': 'error',
			'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
			'svelte/no-immutable-reactive-statements': 'error',
			'svelte/no-inner-declarations': 'error',
			'svelte/no-inspect': 'warn',
			'svelte/no-navigation-without-resolve': 'error',
			'svelte/no-not-function-handler': 'error',
			'svelte/no-object-in-text-mustaches': 'error',
			'svelte/no-raw-special-elements': 'error',
			'svelte/no-reactive-functions': 'error',
			'svelte/no-reactive-literals': 'error',
			'svelte/no-reactive-reassign': 'error',
			'svelte/no-shorthand-style-property-overrides': 'error',
			'svelte/no-store-async': 'error',
			'svelte/no-svelte-internal': 'error',
			'svelte/no-unknown-style-directive-property': 'error',
			'svelte/no-unnecessary-state-wrap': 'error',
			'svelte/no-unused-props': 'error',
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/no-useless-children-snippet': 'error',
			'svelte/no-useless-mustaches': 'error',
			'svelte/prefer-svelte-reactivity': 'error',
			'svelte/prefer-writable-derived': 'error',
			'svelte/require-each-key': 'error',
			'svelte/require-event-dispatcher-types': 'error',
			'svelte/require-store-reactive-access': 'error',
			'svelte/system': 'error',
			'svelte/valid-each-key': 'error',
			'svelte/valid-prop-names-in-kit-pages': 'error',
			'vite-plus/prefer-vite-plus-imports': 'error'
		},
		overrides: [
			{
				files: ['*.svelte', '**/*.svelte'],
				globals: {
					$bindable: 'readonly',
					$derived: 'readonly',
					$effect: 'readonly',
					$host: 'readonly',
					$inspect: 'readonly',
					$props: 'readonly',
					$state: 'readonly'
				},
				rules: {
					'no-inner-declarations': 'off',
					'no-self-assign': 'off'
				},
				jsPlugins: ['eslint-plugin-svelte']
			}
		],
		options: {
			typeAware: true,
			typeCheck: true
		}
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		sortPackageJson: false,
		ignorePatterns: [
			'package-lock.json',
			'pnpm-lock.yaml',
			'src/lib/wasm/',
			'target/',
			'worker-configuration.d.ts',
			'yarn.lock',
			'bun.lock',
			'bun.lockb',
			'/static/'
		]
	},
	plugins: lazyPlugins(() => [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	])
});
