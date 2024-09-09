import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ShoppingCartContext } from "../../context"

export default function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { productDetails, setProductDetails, loading, setLoading, handleAddToCart } = useContext(ShoppingCartContext)

    async function fetchProductDetails() {
        setLoading(true)
        const apiResponse = await fetch(`https://dummyjson.com/products/${id}`)
        const result = await apiResponse.json();
        if (result) setProductDetails(result)
        setLoading(false)
    }

    // function handleGoToCartPage () {
    //     navigate(`/cart`)
    // }

    useEffect(() => {
        fetchProductDetails()
    }, [id])

    if (loading) return <div>Data is loading please wait</div>

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Images */}
                <div className="flex-shrink-0">
                    <img
                        src={productDetails.thumbnail}
                        alt={productDetails.title}
                        className="w-full h-auto object-cover rounded-md"
                    />
                    <div className="flex space-x-2 mt-4">
                        {productDetails.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                    <h1 className="text-2xl font-semibold">{productDetails.title}</h1>
                    <p className="text-gray-500 text-sm mb-4">{productDetails.brand}</p>
                        <button onClick={()=> handleAddToCart(productDetails)} className="bg-gray-600 text-white">
                            Add to Cart
                        </button>
                    <p className="text-lg mb-2">
                        Price: <span className="font-semibold">${productDetails.price}</span>
                        {productDetails.discountPercentage > 0 && (
                            <span className="ml-2 text-green-500">-{productDetails.discountPercentage}%</span>
                        )}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">{productDetails.availabilityStatus}</p>

                    <p className="mb-4">
                        <strong>Description: </strong>
                        {productDetails.description}
                    </p>

                    <div className="mb-4">
                        <strong>Dimensions: </strong>
                        <span>{productDetails.dimensions.width}W x {productDetails.dimensions.height}H x {productDetails.dimensions.depth}D (inches)</span>
                    </div>

                    <div className="mb-4">
                        <strong>Weight: </strong>
                        <span>{productDetails.weight} kg</span>
                    </div>

                    <div className="mb-4">
                        <strong>Category: </strong>
                        <span>{productDetails.category}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Tags: </strong>
                        {productDetails.tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded mr-2">{tag}</span>
                        ))}
                    </div>

                    <div className="mb-4">
                        <strong>Rating: </strong>
                        <span>{productDetails.rating}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Stock: </strong>
                        <span>{productDetails.stock} available</span>
                    </div>

                    <div className="mb-4">
                        <strong>Minimum Order Quantity: </strong>
                        <span>{productDetails.minimumOrderQuantity}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Return Policy: </strong>
                        <span>{productDetails.returnPolicy}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Shipping Information: </strong>
                        <span>{productDetails.shippingInformation}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Warranty Information: </strong>
                        <span>{productDetails.warrantyInformation}</span>
                    </div>

                    <div className="mb-4">
                        <strong>SKU: </strong>
                        <span>{productDetails.sku}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Barcode: </strong>
                        <span>{productDetails.meta.barcode}</span>
                    </div>

                    <div className="mb-4">
                        <strong>QR Code: </strong>
                        <a href={productDetails.meta.qrCode} target="_blank" rel="noopener noreferrer">
                            <img src={productDetails.meta.qrCode} alt="QR Code" className="w-24 h-24 object-contain" />
                        </a>
                    </div>

                    <div className="mb-4">
                        <strong>Created At: </strong>
                        <span>{new Date(productDetails.meta.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="mb-4">
                        <strong>Updated At: </strong>
                        <span>{new Date(productDetails.meta.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}