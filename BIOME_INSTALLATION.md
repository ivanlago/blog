# Biome Installation Guide

To get full Biome integration with VS Code (formatting on save, error highlighting, etc.), please install the official Biome extension:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Biome"
4. Install the official "Biome" extension by "BiomeJS"

The extension ID is: `biomejs.biome`

## Features

With the Biome VS Code extension installed and our configuration:
- Code will be automatically formatted on save
- Linting errors will be shown in real-time
- Import sorting will be applied automatically
- All formatting will follow the project's Biome configuration

## Configuration

Our Biome configuration is located at `biome.json` and includes:
- Formatter settings (2-space indentation, double quotes)
- Linter with recommended rules enabled
- Import organization
- VCS integration with git ignore support

## Available Commands

You can also run Biome from the terminal:
- `npm run lint` - Check for formatting and linting issues
- `npm run lint:fix` - Automatically fix formatting and linting issues
- `npm run format` - Format all files in the project