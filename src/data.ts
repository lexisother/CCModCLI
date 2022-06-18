export const tsconfig = {
    include: [
        "src",
        "node_modules/ultimate-crosscode-typedefs/crosscode-ccloader-all.d.ts"
    ],
    compilerOptions: {
        outDir: "dist",
        sourceMap: true,
        strict: true,
        module: "esnext",
        moduleResolution: "node",
        target: "es2018",
        allowJs: true,
        forceConsistentCasingInFileNames: true
    }
};

export const packageJson = (name) => ({
    name: name,
    devDependencies: {
        "@types/node": "*",
        typescript: "*",
        "ultimate-crosscode-typedefs":
            "github:dmitmel/ultimate-crosscode-typedefs"
    },
    scripts: {
        build: "tsc --build",
        watch: "tsc --build --watch"
    }
});

export const prestartModule = `// Any code that runs in the \`prestart\` phase can be put here.

// Additionally, you can \`import\` any of the other files here.
// Please note that they need \`.js\` extensions.

console.log('hi!');
`;

export const gitignore = `##### NODE #####
/node_modules/
/dist/`;
