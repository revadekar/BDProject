import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { useStyletron } from 'styletron-react'; // Import `useStyletron` here
import Dashboard from './dashboard';
import Navbar from './navbar';

const engine = new Styletron();

function App() {
  const [css] = useStyletron(); // Initialize the `css` variable
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Navbar
          className={css({
            zIndex: 2, // Add this to position Navbar above other content
          })}
        />
        <Dashboard />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
