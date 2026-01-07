# Expo CLI Commands

## Introduction

Expo CLI is a development tool that is automatically installed with the Expo package when you create a new project. You can use it by leveraging `npx` (a Node.js package runner).

Expo CLI is designed to help you move faster during the app development phase. Your first interaction with Expo CLI is typically starting the development server by running the command: `npx expo start`.

In a nutshell, Expo CLI allows you to develop, compile, start your app, and perform many other development tasks. See the [Expo CLI reference](https://docs.expo.dev/more/expo-cli/) for more available options and actions you can perform with the CLI.

---

## Common Commands

The following is a list of common commands that you will use with Expo CLI while developing your app:

| Command | Description |
|---------|-------------|
| `npx expo start` | Starts the development server (works with both development builds and Expo Go). This is typically the first command you run after creating a project. |
| `npx expo prebuild` | Generates native Android and iOS directories using Prebuild. Use this when you need to add custom native code to your Expo project. |
| `npx expo run:android` | Compiles and runs the native Android app locally on your machine. Requires Android Studio and Android SDK to be set up. |
| `npx expo run:ios` | Compiles and runs the native iOS app locally on your machine. Requires Xcode and macOS. |
| `npx expo install <package-name>` | Installs a new library or validates and updates specific libraries in your project. Use `--fix` option to automatically fix version mismatches. |
| `npx expo lint` | Sets up and configures ESLint in your project. If ESLint is already configured, this command will lint your project files to check for code quality issues. |

---

## Usage Examples

### Starting Development Server
```bash
npx expo start
```

### Installing a Package
```bash
npx expo install react-native-reanimated
```

### Installing with Fix Option
```bash
npx expo install react-native-reanimated --fix
```

### Running on Android
```bash
npx expo run:android
```

### Running on iOS
```bash
npx expo run:ios
```

### Linting Your Project
```bash
npx expo lint
```

---

## Additional Resources

- **Expo CLI Reference:** https://docs.expo.dev/more/expo-cli/
- **Expo Documentation:** https://docs.expo.dev
