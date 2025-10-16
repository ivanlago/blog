# Biome Setup and Configuration

## Extension Installation

The Biome extension should be automatically recommended when you open this project in VS Code. If not, you can install it manually:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Biome"
4. Install the official "Biome" extension by "BiomeJS"

## Configuration

Biome is configured through the [biome.json](file:///d:/Projetos/blog/biome.json) file in the root of the project. The current configuration includes:

- Formatter with 2-space indentation and double quotes
- Recommended linter rules enabled
- VCS integration enabled

## VS Code Settings

The project includes VS Code settings that enable format-on-save for all JavaScript, TypeScript, and JSON files:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

## Available Commands

You can run Biome commands from the terminal:

- `npm run lint` - Check for formatting and linting issues
- `npm run lint:fix` - Automatically fix formatting and linting issues
- `npm run format` - Format all files in the project
- `npx biome check .` - Check all files
- `npx biome check --apply .` - Fix all auto-fixable issues
- `npx biome format --write .` - Format all files

## Troubleshooting

If auto-formatting on save is not working:

1. Make sure the Biome extension is installed
2. Check that there are no conflicting extensions (Prettier, ESLint)
3. Verify that the VS Code settings are correct
4. Try restarting VS Code
5. Check that the Biome language server is running (check the Biome output panel)

## File Ignoring

Biome respects your .gitignore file for determining which files to format and lint.