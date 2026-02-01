import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import ImageUploadReview from "../ui/image-uplod-review";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { createCategory, updateCategory } from "@/app/services/category.services";
import { toast } from "react-toastify";

type TCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    category?: Category | null;
    onSuccess?: () => void;
};
type CategoryFormData = {
    name: string;
    description: string;
}



const CategoryModal = ({isOpen,onClose,onSuccess,category}:TCategoryModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setimagePreview] = useState<string | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode=!!category;
    const [formData, setFormData] = useState<CategoryFormData>({
            name:  "",
            description:"",
    });

    useEffect (()=>{
        if (isEditMode && isOpen) {
            setFormData({
                name: category.name,
                description: category.description,
            })
            setimagePreview(category.imageUrl ? getImageUrl(category.imageUrl) : undefined);
        }
        else if (isOpen){
            setFormData({
                name:  "",
                description:"",
            });
            setImageFile(null);
            setimagePreview(undefined);
        }

        },[category, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "price" || id === "stock" ? Number(value) : value,
        }));
    };

    // handle submit
    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            try{
                const data = new FormData();
                data.append("name", formData.name);
                data.append("description", formData.description);
                if(imageFile){
                    data.append("image", imageFile);
                }
    
                if(isEditMode){
                    await updateCategory(category._id, data);
                }else{
                    await createCategory(data);
                }
                toast.success(isEditMode ? "Category updated successfully!" : "Category created successfully");
    
                // reset form data
                setFormData({
                    name:  "",
                    description:"",
                });
                setImageFile(null);
                setimagePreview(undefined);
    
                onSuccess?.();
                onClose();
            }catch (error){
                console.error(isEditMode ? "Failed to update category" : "Failed to create category", error);
                toast.error(isEditMode ? "Failed to update category" : "Failed to create category");
            } finally{
                setIsSubmitting(false);
            }
        };


    return(
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category":"Add New Category"}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex gap-7">
                    <div className="min-w-50">
                        <ImageUploadReview  
                        label="Category Image" 
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
                            <label htmlFor="name">Category Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e. g. Running Shoes" 
                            />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                rows={4} 
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Product Details..."
                            ></textarea>
                        </div>
                    </div>

                    
                </div>
                <Button  type="submit" onClick={handleSubmit} disabled={isSubmitting} className="ml-auto mt-3 rounded-lg">
                    {
                    isEditMode ? "Update Category" : "Create Category"
                    }</Button>
            </form>
        </Modal>
    )
};
export default CategoryModal;