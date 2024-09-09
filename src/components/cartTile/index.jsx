import {useContext} from "react";
import {ShoppingCartContext} from "../../context/index.jsx";

export default function CartTile({ singleCartItem }) {

    const {handleRemoveFromCart} = useContext(ShoppingCartContext)
    return (
        <>
            <div className="grid grid-cols-3 items-start gap-4">
                <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
                        <img src={singleCartItem?.thumbnail} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div >
                        <h3 className="text-base font-bold text-gray-900">
                            {singleCartItem?.title}
                        </h3>
                        <button onClick={()=>handleRemoveFromCart(singleCartItem, true)} className="text-sm px-4 py-2 bg-black text-white">REMOVE</button>
                    </div>
                </div>
                <div className="ml-auto">
                    <h3 className="text-lg font-bold text-gray-900">${singleCartItem?.totalPrice.toFixed(2)}</h3>
                    <div className="mt-3">
                        <button onClick={()=>handleRemoveFromCart(singleCartItem, false)} className="border border-[#000]">-</button>
                        <button className="border border-[#000]">+</button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-500"/>
        </>
    )
}