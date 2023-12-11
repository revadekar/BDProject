
import LoginPage from './login';
import { Route, Routes } from 'react-router-dom';

function App() {
  // const [css] = useStyletron(); // Initialize the `css` variable
  return (


      <Routes>
      <Route path="/" element={<LoginPage/>} />
      </Routes>

  );
}

export default App;
