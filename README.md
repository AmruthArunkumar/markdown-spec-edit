# Creation Commands

```bash
npm create vite@latest .
npm install electron --save-dev
```

# Dev Commands to Run Project

To run the React App (Terminal 1)
```bash
npm run dev
```

To run the Electron app on top of the React one (Terminal 2)
on another terminal
```bash
npm run electron
```

# NPM Libraries Installed

```bash
npm install @electron-forge/cli --save-dev
npm install @codemirror/state @codemirror/view @codemirror/commands
```

# Set Up Electron Forge

```bash
npx electron-forge import
```

# Building the App

```bash
npm run build
npm run make
```

# What Each Folder/File Contains

`public/`: favicons and logos

`src/`: TS and CSS source files

`src/assets`: images to use in the app

`src/electron/main.js`: loads the app in an electron window

`dist/`: contains the compiled JS files

`out/`: contains the output build executables

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
