import logo from './logo.svg';
import './App.css';
import Dashboard from './Page/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster  position="top-right" />
    <Dashboard />
    </>
  );
}

export default App;
