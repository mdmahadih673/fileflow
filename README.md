# FileFlow

A modern desktop file organizer built with Electron + React + TypeScript.

## Features
- **Smart Categorization**: Automatically groups files into categories like Images, Videos, Audio, Documents, Archives, Code, and Applications.
- **Duplicate Safety**: Automatically renames duplicate files to prevent accidental overwrites.
- **Undo Capability**: Made a mistake? Easily reverse the last organization action from the History tab.
- **Modern UI**: Dark-themed, glassmorphism UI built with Tailwind CSS.

## Tech Stack
- React 19
- TypeScript
- Electron
- Tailwind CSS v4
- Vite

## Development
Run the development environment (starts Vite server and Electron app):
```bash
npm run dev
```

## Build
Build the Windows executable:
```bash
npm run build
```

## Project Structure
- `electron/`: Main process files (window management, filesystem access, IPC).
- `src/`: React renderer (UI components, pages, tailwind config).
- `src/types/`: Shared types between Electron and React.

## Security
FileFlow runs entirely locally. It does not upload files to external servers or modify file contents.
