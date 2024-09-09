import { useContext } from "react"
import { ShoppingCartContext } from "../../context"
import ProjectTile from "../../components/ProductTile"

export default function ProductListPage() {
    const { listOfProducts, loading } = useContext(ShoppingCartContext)
    if (loading) return <>Loading, Please Wait !!!</>

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                {
                    listOfProducts && listOfProducts.length > 0 ? 
                    listOfProducts.map(singleProduct => <ProjectTile key={singleProduct.id} product={singleProduct} />) : <div>No Products Found</div>
                }
            </div>
        </div>
    )
}