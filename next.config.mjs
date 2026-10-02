// REACT_COMPILER=1 turns on the React Compiler (Rust port). The Lingui SWC plugin runs either way.
const reactCompiler = process.env.REACT_COMPILER === '1';

export default {
    typescript: { ignoreBuildErrors: true },
    reactCompiler,
    experimental: {
        turbopackRustReactCompiler: reactCompiler,
        // descriptorFields: 'all' keeps the message text in the output so the extracted message is visible.
        swcPlugins: [['@lingui/swc-plugin', { descriptorFields: 'all' }]],
    },
};
