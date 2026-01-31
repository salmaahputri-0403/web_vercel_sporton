import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import ImageUploadReview from "../ui/image-uplod-review";
import { useEffect, useState } from "react";
import { Product, Category } from "@/app/types";
import { get } from "http";
import { getAllCategories } from "@/app/services/category.services";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    products?: Product | null;
};
type ProductFormData = {
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    description: string;
}



const ProductModal = ({isOpen,onClose,products,onSuccess}:TProductModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setimagePreview] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<ProductFormData>({
        name:  "",
        price: 0,
        stock:  0,
        categoryId:  "",
        description:"",
    });

    const isEditMode=!!products;

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data)
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "price" || id === "stock" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const data = new FormData();
            data.append("name", formData.name);
            data.append("price", formData.price.toString());
            data.append("stock", formData.stock.toString());
            data.append("categoryId", formData.categoryId);
            data.append("description", formData.description);
            if(imageFile){
                data.append("image", imageFile);
            }

            if(isEditMode){
                await updateProduct(products._id, data);
            }else{
                await createProduct(data);
            }

            // reset form data
            setFormData({
                name:  "",
                price: 0,
                stock:  0,
                categoryId:  "",
                description:"",
            });
            setImageFile(null);
            setimagePreview(undefined);

            toast.success(isEditMode ? "Product updated successfully!" : "Product created successfully");

            onSuccess?.();
            onClose();
        }catch (error){
            console.error(isEditMode ? "Failed to update product" : "Failed to create product", error);
            toast.error(isEditMode ? "Failed to update product" : "Failed to create product");
        } finally{
            setIsSubmitting(false);
        }
    };

    useEffect(()=>{
        if (isEditMode && isOpen) {
            setFormData({
                name: products.name,
                description: products.description,
                price: products.price,
                categoryId: products.category._id,
                stock: products.stock,
        });
            setimagePreview(products.imageUrl ? getImageUrl(products.imageUrl) : undefined);
        } else if (isOpen){
            setFormData({
                name:  "",
                price: 0,
                stock:  0,
                categoryId:  "",
                description:"",
            });
            setImageFile(null);
            setimagePreview(undefined);
        }
    },[isOpen, products]);

    useEffect(()=>{
        fetchCategories();
    },[]);

    return(
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Product" : "Add New Product"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex gap-7">
                    <div className="min-w-50">
                        <ImageUploadReview  
                        label="Product Image" 
                        value={imagePreview} 
                        onChange={
                            (file)=>{
                                setImageFile(file);
                                setimagePreview(URL.createObjectURL(file));
                            }
                        }/>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="productName">Product Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e. g. Running Shoes" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group-admin">
                                <label htmlFor="Price">Price (IDR)</label>
                                <input 
                                    type="number" 
                                    id="Price" 
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0" 
                                />
                            </div>
                            <div className="input-group-admin">
                                <label htmlFor="Stock">Stock</label>
                                <input 
                                    type="number" 
                                    id="Stock" 
                                    name="Stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0" 
                                />
                            </div>
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="Category">Category</label>
                            <select name="category" id="Category"
                                value={formData.categoryId}
                                onChange={handleChange}>
                                <option value="" disabled>Select Category</option>
                                {
                                    categories.map((category) =>(
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input-group-admin">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows={7} 
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Product Details..."
                    ></textarea>
                </div>
                <Button  type="submit" onClick={handleSubmit} disabled={isSubmitting} className="ml-auto mt-3 rounded-lg">
                    {
                    isSubmitting ? "Update Product" : "Create Product"
                    }</Button>
            </form>
        </Modal>
    )
};
export default ProductModal;