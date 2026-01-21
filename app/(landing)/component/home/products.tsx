"use client"

import Link from "next/link";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import Button from "../ui/button";
import PriceFormater from "@/app/utils/price-formater";
import { Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";

// const productList=[
//     {
//         name:"SportsOn Product 1",
//         category:"Running",
//         price: 45000,
//         imgUrl:"product-1.png",
//     },
//     {
//         name:"SportsOn Product 2",
//         category:"Running",
//         price: 25000,
//         imgUrl:"product-2.png",
//     },
//     {
//         name:"SportsOn Product 3",
//         category:"Running",
//         price: 35000,
//         imgUrl:"product-3.png",
//     },
//     {
//         name:"SportsOn Product 4",
//         category:"Running",
//         price: 45000,
//         imgUrl:"product-4.png",
//     },
//     {
//         name:"SportsOn Product 5",
//         category:"Running",
//         price: 55000,
//         imgUrl:"product-5.png",
//     },
//     {
//         name:"SportsOn Product 6",
//         category:"Running",
//         price: 15000,
//         imgUrl:"product-6.png",
//     },
// ];

type TProductsProps ={
    products: Product[]
}


const ProductsSection =({products}: TProductsProps) =>{
const {addItem} = useCartStore()
const handleAddtoCart = (e:React.MouseEvent, product:Product)=>{
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
}

    return(
        <section id="product-section" className="container mx-auto mt-32 mb-52">
            <h2 className="font-bold italic text-4xl text-center mb-11">
                <span className="text-primary ">OUR </span>PRODUCTS
            </h2>
            <div className="grid grid-cols-4 gap-5">
                {products.map((product) => (
                    < Link href={`/product/${product._id}`} key={product._id} className="p-1.5 bg-white hover:drop-shadow-xl duration-300">
                        <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
                            <Image 
                            src={getImageUrl(product.imageUrl)}
                            width={300} 
                            height={281}
                            alt={product.name}
                            className="aspect-square object-contain"/>
                            <Button className="w-10 h-10 p-2! absolute right-3 top-3" onClick={(e)=> handleAddtoCart(e,product)}><FiPlus size={24}/></Button>
                        </div>
                        <h3 className="font-medium text-lg mb-1.5 mt-5">{product.name}</h3>
                        <div className="flex justify-between mb-8">
                            <div className="text-gray-500">{product.category.name}</div>
                            <div className="font-medium text-primary">
                                {PriceFormater(product.price)}
                            </div>
                        </div>
                    </Link>
                ))}  
            </div>
        </section>
    )
}
export default ProductsSection;