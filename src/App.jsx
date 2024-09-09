import { Route, Routes } from "react-router-dom"
import ProductListPage from "./pages/productList"
import ProductDetails from "./pages/productDetails"
import CartList from "./pages/cartList"

function App() {

  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartList />} />
      </Routes>
    </>
  )
}

export default App
