import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { ThemeProvider } from "./ThemeContext";
import FullScreen from './components/FullScreen';
import CalculatorCard from './components/CalculatorCard';

function App() {
  return (
    <>
    <ThemeProvider>
      <FullScreen>
        <CalculatorCard/>
        </FullScreen>
    </ThemeProvider>
    </>
  )
}

export default App
