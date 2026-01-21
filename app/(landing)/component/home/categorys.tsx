import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

const categoryList = [
    {
        name:"Running",
        imgUrl:"category-running.png",
    },
    // {
    //     name:"Tennis",
    //     imgUrl:"category-tennis.png",
    // },
    // {
    //     name:"Basketball",
    //     imgUrl:"category-basketball.png",
    // },
    // {
    //     name:"Badminton",
    //     imgUrl:"category-badminton.png",
    // },
    // {
    //     name:"Football",
    //     imgUrl:"category-football.png",
    // },
    // {
    //     name:"Swimming",
    //     imgUrl:"category-swimming.png",
    // },
];


type TCategoriesProps={
    categories: Category[]
}

const CategoriesSection = ({categories}:TCategoriesProps) => {
    return(
        <section id="category" className="container mx-auto mt-32 pb-20">
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl">Browse By Categories</h2>
                <Link href="#" className="flex gap-2 text-primary font-medium">
                <span className="self-center">See All Categories</span>
                <FiArrowRight  className="self-center"/>
                </Link>
            </div>
            {/* dinamik rendering */}
            <div className="grid grid-cols-6 gap-12 mt-8">
                {categories.map((category) => (
                    <div key={category._id} className="rounded-lg bg-linear-to-r from-[#F1F1F1] to-[#F7F7F7D1] w-full aspect-square flex justify-center">
                        <div className="self-center">
                            <Image 
                                src={getImageUrl(category.imageUrl)} 
                                width={86} 
                                height={86} 
                                alt={category.name}
                                className="mb-2.5"
                            />
                            <div className="text-primary font-medium text-xl text-center">{category.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default CategoriesSection;