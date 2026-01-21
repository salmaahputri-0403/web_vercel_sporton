import Image from "next/image";
import ProductActions from "../../component/product_details/product-actions";
import PriceFormater from "@/app/utils/price-formater";
import { getProductDetail } from "@/app/services/product.service";
import { getImageUrl } from "@/app/lib/api";

export type TPageProps={
    params: Promise<{id:string}>;
}



const ProductDetail =async({params}: TPageProps) =>{
    const{id}= await params;
    const product = await getProductDetail(id);
    
    
    return(
        <main id="product-detail" className="container mx-auto py-40 flex gap-12">
            <div className="aspect-square  min-w-140 flex justify-center items-center bg-primary-light">
                <Image 
                    src={getImageUrl(product.imageUrl)}
                    width={564} 
                    height={378}
                    alt={product.name}
                    className="aspect-square object-contain w-full"
                        />
            </div>
            
            <div className="w-3/4">
                <h1 className="font-extrabold text-5xl mb-6">{product.name}</h1>
                <div className="w-20 h-8 bg-primary-light flex items-center justify-center rounded-full text-primary text-xs">{product.category.name}</div>
                <p className="text-dark-alternate mb-8 mt-5 leading-loose">{product.description}</p>
                <div className="text-primary text-3xl font-semibold mb-12">
                    {
                        PriceFormater(product.price)
                    }
                </div>
                <ProductActions product={product} stock ={product.stock}/>
            </div>
        </main>
    )
}
export default ProductDetail;