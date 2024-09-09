import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const ShoppingCartContext = createContext(null)

function ShoppingCartProvider({children}) {
    const [loading, setLoading] = useState(true)
    const [listOfProducts, setListOfProducts] = useState([])
    const [productDetails, setProductDetails] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    async function fetchListOfProducts() {
        const apiResponse = await fetch("https://dummyjson.com/products");
        const result = await apiResponse.json()
        if (result && result?.products) {
            setLoading(false)
            setListOfProducts(result?.products)
        }
    }

    useEffect(() => {
        fetchListOfProducts()
        const storedCartItems = localStorage.getItem("cartItems");
        const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        setCartItems(cartItems);

    }, [])

    function handleAddToCart(product) {
        let cpyExistingCart = [...cartItems];
        const findIndexOfCurrentItem = cpyExistingCart.findIndex(cartItem => cartItem.id === cpyExistingCart.id)
        if (findIndexOfCurrentItem == -1) { //item is not present in the cart already
            cpyExistingCart.push({
                ...product,
                quantity: 1,
                totalPrice: product?.price
            })
        } else { //product is already in the cart, increase the quantity

        }

        setCartItems(cpyExistingCart)
        localStorage.setItem("cartItems", JSON.stringify(cpyExistingCart))
        navigate("/cart")
    }

    function handleRemoveFromCart(product, removeFully) {
        let cpyCartItems = [...cartItems]
        let findIndexOfCurrentCartItem = cpyCartItems.findIndex(item => item.id === product.id)

        if (removeFully) {
            cpyCartItems.splice(findIndexOfCurrentCartItem, 1)
        } else {
            cpyCartItems[findIndexOfCurrentCartItem] = {
                ...cpyCartItems[findIndexOfCurrentCartItem],
                quantity: cpyCartItems[findIndexOfCurrentCartItem].quantity - 1,
                totalPrice: (cpyCartItems[findIndexOfCurrentCartItem].quantity) * cpyCartItems[findIndexOfCurrentCartItem].price
            }
        }

        localStorage.setItem("cartItems", JSON.stringify(cpyCartItems))


        setCartItems(cpyCartItems)
    }

    return (
        <ShoppingCartContext.Provider value={{
            listOfProducts,
            loading,
            setLoading,
            productDetails,
            setProductDetails,
            handleAddToCart,
            cartItems,
            handleRemoveFromCart
        }}
        >
            {children}
        </ShoppingCartContext.Provider>)
}

export default ShoppingCartProvider;