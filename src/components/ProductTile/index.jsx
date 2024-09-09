import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {ShoppingCartContext} from "../../context/index.jsx";

export default function ProjectTile({product}) {

    const navigate = useNavigate()
    const {handleAddToCart} = useContext(ShoppingCartContext)

    function handleProductDetailView (productId) {
        navigate(`/product-details/${productId}`)
    }

    return (
        <>
            <div className="bg-white p-4 border rounded-lg shadow-md">
                <img src={product.thumbnail} alt="Product 1" className="w-full mb-4" />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <button onClick={()=> handleProductDetailView(product.id)} className="bg-gray-700 text-white">
                    View Details
                </button>
                <button onClick={()=> handleAddToCart(product)} className="bg-gray-700 text-white">
                    Add To Cart
                </button>
            </div>
        </>
    )
}
