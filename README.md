
This project was bootstrapped with [Vite](https://vitejs.dev/). Vite is quite fast compared to `Create-React-App` with the option of easy configuration without `ejecting`. The only major issue while using it is that getting `Jest` to work with it can get a bit tricky when your code is using `import.meta` 


## Getting Started

Clone the repo and install dependencies...

```

clone <repo>

cd <repo>

yarn or npm i

```

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs all the test suites.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Offline support
The app has a service-worker integrated and works offline. This feature works only in prod due to limitations of vite and how it bundles the app in development. To debug the service worker run `yarn build` to generate production build and run `yarn serve` to preview.

The notebook entry is synced with the IndexedDB and the local cached copy is synced on load.


## Extra features
The app tries to mimic the Medium editor. It uses `contenteditable` div for providing rich-text editor like experience.
On selection of text via mouse, a tooltip with formatting option provides the additional functionality of formatting the selection with `Bold`, `Italic` or `Underline`

## Localisation
Uses i18n. currently support German and English

### Improvements todo
- To improve UX, allow hiding the analysis sidebar.
- After formatting the caret stays inside the newly enclosing tag and formatting is continued for rest of the typed text.
- Tooltip only shows for selection via mouse.
- Show message when user is offline.
- Show spinner when editor is waiting for local cache to resolve.
- Allow language change via CTA
