import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Home'
import ProductListing from './pages/productListing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListingPage from './pages/productListing'
import CartPage from './pages/CartPage'
import Navbar from './Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Navbar />
        <Routes>
          
          <Route path="/" element={<Homepage />} />
          <Route path="/product-listing/:categoryId" element={<ProductListingPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
    
    </Router>
    </>
  )
}

export default App
