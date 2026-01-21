import PriceFormater from "@/app/utils/price-formater";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash, FiTrash2, FiTrello } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";


// export const cartList=[
//     {
//         name:"SportsOn Product 1",
//         category:"Running",
//         price: 45000,
//         qty:2,
//         imgUrl:"product-1.png",
//     },
//     {
//         name:"SportsOn Product 2",
//         category:"Running",
//         price: 25000,
//         qty:3,
//         imgUrl:"product-2.png",
//     },
//     {
//         name:"SportsOn Product 3",
//         category:"Running",
//         price: 35000,
//         qty:3,
//         imgUrl:"product-3.png",
//     },
//     {
//         name:"SportsOn Product 4",
//         category:"Running",
//         price: 35000,
//         qty:3,
//         imgUrl:"product-4.png",
//     },
//     {
//         name:"SportsOn Product 5",
//         category:"Running",
//         price: 35000,
//         qty:3,
//         imgUrl:"product-5.png",
//     },
    
// ]

const PopupCard =() =>{
    const{push}=useRouter()
    const {items, removeItem}=useCartStore()
    const totalPrice = items.reduce((total,item)=>total + item.price * item.qty,0)
    const checkout =() =>{
            push("/checkout")
        
            }
    return(
        <div className=" absolute bg-white right-0 top-13 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
            <div className="p-4 border-b border-gray-200 font-bold text-center">
                Shopping Chart
            </div>
            {
                items.length ? items.map((item, index)=>(
                    <div  key={index} className="border-b border-gray-200 p-4 flex gap-3 ">
                        <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
                            <Image
                            src={getImageUrl(item.imageUrl)}
                            alt={item.name} 
                            width={63}
                            height={63}
                            className="aspect-square object-contain"
                            />
                        </div>
                        <div className="self-center">
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="flex gap-3 font-medium text-xs">
                                <div>{item.qty}x</div>
                                <div className="text-primary">{PriceFormater(item.price)}</div>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="w-7 h-7 p-0! self-center ml-auto"onClick={()=>removeItem(item._id)}>
                            <FiTrash2/>
                        </Button>
                    </div>  
                )):(
                    <div className="text-center opacity-50 py-5">Your Shopping Cart is Empty</div>
                )}
                <div className="border-t border-gray-300 p-4">
                    <div className="flex justify-between font-bold">
                        <div className=" text-sm">Total</div>
                        <div className="text-primary text-xs">{PriceFormater(totalPrice)}</div>
                    </div>
                    <Button variant="dark" size="sm" className="w-full py-2 mt-4" onClick={checkout}>
                        Checkout Now
                        <FiArrowRight/>
                    </Button>
                </div>
        </div>
    )
}
export default PopupCard;