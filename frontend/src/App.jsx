import AddCard from './components/AddCard';
import Cards from './components/Cards'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

function App() {

 

  return (
    <ThemeProvider >
        <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addcard" element={<AddCard/>} />
      </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
