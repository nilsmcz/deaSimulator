# Deterministischer endlicher Automat (DEA) Simulation

Diese Anwendung ermöglicht es, einen deterministischen endlichen Automaten (DEA) zu erstellen und zu simulieren. Ein DEA besteht aus einer endlichen Menge von Zuständen, einem Eingabealphabet, einer Übergangsfunktion und einem Anfangszustand sowie einer Menge von Endzuständen.

## Funktionalitäten

- Zustände hinzufügen und löschen
- Alphabet hinzufügen und löschen
- Übergänge zwischen Zuständen definieren und löschen
- Übergänge mit dem Epsilon-Symbol definieren (leerer Übergang)
- Anzeige der aktuellen Zustände, des Alphabets und der definierten Übergänge
- Bestätigungsfenster für das Überschreiben von bestehenden Übergängen

## Verwendung

1. Zustände hinzufügen: Geben Sie den Namen des Zustands in das Textfeld ein und klicken Sie auf "Add".
2. Alphabet hinzufügen: Geben Sie das Zeichen in das Textfeld ein und klicken Sie auf "Add".
3. Übergänge definieren: Wählen Sie den Startzustand, das Aktionssymbol und den Endzustand aus den Dropdown-Menüs aus und klicken Sie auf "Submit".
4. Übergänge anzeigen: Alle definierten Übergänge werden unter dem Abschnitt "P" angezeigt.
5. Löschen: Klicken Sie auf "Clear", um die Liste der Zustände, das Alphabet oder die Übergänge zu löschen.

## Beispiel

Ein Beispiel für definierte Übergänge:

```plaintext
q1 ➝ a q2
q1 ➝ b q3
q2 ➝ a q1
q2 ➝ b q3
```

## Vorschau

<img src="https://i.ibb.co/483ZkVT/preview1.png" alt="" width="100%">
<img src="https://i.ibb.co/HrNZh4t/preview2.png" alt="" width="100%">

### Live-Vorschau

Live-Vorschau: <a href="https://funny-kelpie-be23d3.netlify.app/" target="_blank">Vorschau anzeigen</a>

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.