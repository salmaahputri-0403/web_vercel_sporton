import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import ImageUploadReview from "../ui/image-uplod-review";
import { useState } from "react";

type TCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
};



const CategoryModal = ({isOpen,onClose}:TCategoryModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setimagePreview] = useState<string | undefined>(undefined);
    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
            <div className="flex flex-col gap-6">
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
                            <label htmlFor="productName">Category Name</label>
                            <input 
                                type="text" 
                                id="productName" 
                                name="productName"
                                placeholder="e. g. Running Shoes" 
                            />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                rows={4} 
                                placeholder="Product Details..."
                            ></textarea>
                        </div>
                    </div>

                    
                </div>
                <Button className="ml-auto mt-3 rounded-lg">Create Category</Button>
            </div>
        </Modal>
    )
};
export default CategoryModal;