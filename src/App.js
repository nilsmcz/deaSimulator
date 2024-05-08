import logo from './logo.svg';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
//Screens
import DeaScreen from './DeaScreen';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <DeaScreen />
    </MantineProvider>
  );
}

export default App;
