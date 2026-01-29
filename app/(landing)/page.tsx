import HeroSection from "./component/home/hero";
import CategoriesSection from "./component/home/categorys";
import ProductsSection from "./component/home/products";
import { getAllCategories } from "../services/category.services";
import { getAllProducts } from "../services/product.service";
export default async function Home() {
    const [categories,products] = await Promise.all([
        getAllCategories(),
        getAllProducts(),
    ]);


    return (
        <main>
            <HeroSection/>
            <CategoriesSection categories ={categories}/>
            <ProductsSection products ={products}/>
        </main>
    );
}
