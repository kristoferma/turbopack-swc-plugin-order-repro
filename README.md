# Turbopack runs the React Compiler before `swcPlugins`

`@lingui/swc-plugin` expands `<Trans>Hello <b>{name}</b></Trans>` into a message with JSX placeholders (`Hello <0>{name}</0>`). With `reactCompiler` + `experimental.turbopackRustReactCompiler`, Turbopack runs the React Compiler in its pre-processing stage, before `swcPlugins`, so the plugin sees the compiler's hoisted temporaries instead of the original JSX and extracts a different message.

`descriptorFields: 'all'` keeps the message text in the build output, so the difference is visible with grep.

Results:

| | React Compiler off | React Compiler on |
|---|---|---|
| next 16.3.6 + `@lingui/swc-plugin` 6.6.0 | `An asterisk matches any characters.<0/>For example <1>s*n</1> matches sun and season.` | `An asterisk matches any characters.{t2}For example <0>s*n</0> matches sun and season.` |
| next 16.4.0-canary.57 + `@lingui/swc-plugin` 6.7.0 | same as above | client chunk: the `{t2}` form; SSR chunk: the correct `<0/>` form |

`<Trans>Hello <b>{name}</b></Trans>` is correct in every case: the compiler only hoists children that don't depend on props.

To run against canary: `npm install next@canary @lingui/swc-plugin@latest` (6.6.0 does not load in 16.4 canaries).

```sh
npm install
REACT_COMPILER=0 npx next build && grep -rho 'message:"[^"]*"' .next/static .next/server | sort -u
rm -rf .next
REACT_COMPILER=1 npx next build && grep -rho 'message:"[^"]*"' .next/static .next/server | sort -u
```
