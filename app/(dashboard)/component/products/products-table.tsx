import PriceFormater from "@/app/utils/price-formater";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const productData =[
    {
        name:"SportsOn Hyperfast Shoes",
        imageUrl :"/image/product/product-1.png",
        category:"Running",
        price:289000,
        stock:2,
    },
    {
        name:"SportsOn Hyperfast Shoes",
        imageUrl :"/image/product/product-2.png",
        category:"Running",
        price:229000,
        stock:5,
    },
    {
        name:"SportsOn Hyperfast Shoes",
        imageUrl :"/image/product/product-3.png",
        category:"Running",
        price:289000,
        stock:2,
    },
]



const ProductTable = () => {
    return(
        <div className=" bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Product</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold">Price</th>
                        <th className="px-6 py-4 font-semibold">Stock</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.map((data, index) => (
                        <tr key={index} className="boder-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 font-medium">
                                <div className="flex gap-2 items-center">
                                    <div className="aspect-square bg-gray-100 rounded-md">
                                        <Image
                                        src={data.imageUrl}
                                        alt={data.name}
                                        width={52}
                                        height={52}
                                        className="aspect-square object-contain"
                                        />
                                    </div>
                                    <span>{data.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                <div className="rounded-md bg-gray-200 py-1 px-2 w-fit">
                                    {data.category}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium">
                                {PriceFormater(data.price)}
                            </td>
                            <td className="px-6 py-4 font-medium">
                                {data.stock} units
                            </td>
                            <td className=" px-6 py-7.5 flex gap-3 text-gray-600 items-center h-full">
                                <button>
                                    <FiEdit2 size={20}/>
                                </button>
                                <button>
                                    <FiTrash2 size={20}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ProductTable;