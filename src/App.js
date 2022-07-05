import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Insertion from './pages/insertionSort'
import Home from './pages/home'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/insertion_sort' element={<Insertion />} />
          <Route path='/' element={<Home />} />
        </Routes>        
      </div>  
    </BrowserRouter>
  );
}

export default App;
