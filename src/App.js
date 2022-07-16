import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Insertion from './pages/insertionSort'
import Home from './pages/home'
import Selection from "./pages/selectionSort"
import Merge from './pages/merge'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/insertion_sort' element={<Insertion />} />
          <Route path='/selection_sort' element={<Selection />} />
          <Route path='/merge_sort' element={<Merge />} />
          <Route path='/' element={<Home />} />
        </Routes>        
      </div>  
    </BrowserRouter>
  );
}

export default App;
