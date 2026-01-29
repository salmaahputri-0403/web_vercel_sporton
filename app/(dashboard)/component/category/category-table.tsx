import PriceFormater from "@/app/utils/price-formater";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const categoryData =[
    {
        name:"Running",
        imageUrl :"/image/category/category-running.png",
        describe:"All Running Items, Shoes, Shirts",
    },
    {
        name:"Football",
        imageUrl :"/image/category/category-football.png",
        describe:"All Football Items, Shoes, Shirts",
    },
    
]



const CategoryTable = () => {
    return(
        <div className=" bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Product</th>
                        <th className="px-6 py-4 font-semibold">Description</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryData.map((data, index) => (
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
                                <div className="rounded-md py-1 px-2 w-fit">
                                    {data.describe}
                                </div>
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
export default CategoryTable;