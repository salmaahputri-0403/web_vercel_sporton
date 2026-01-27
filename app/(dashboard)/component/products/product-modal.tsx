import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import ImageUploadReview from "../ui/image-uplod-review";
import { useState } from "react";

type TProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
};



const ProductModal = ({isOpen,onClose}:TProductModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setimagePreview] = useState<string | undefined>(undefined);
    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
            <div className="flex flex-col gap-6">
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
                                id="productName" 
                                name="productName"
                                placeholder="e. g. Running Shoes" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group-admin">
                                <label htmlFor="Price">Price (IDR)</label>
                                <input 
                                    type="number" 
                                    id="Price" 
                                    name="Price"
                                    placeholder="0" 
                                />
                            </div>
                            <div className="input-group-admin">
                                <label htmlFor="Stock">Stock</label>
                                <input 
                                    type="number" 
                                    id="Stock" 
                                    name="Stock"
                                    placeholder="0" 
                                />
                            </div>
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="Category">Category</label>
                            <select name="Category" id="Category">
                                <option value="" disabled>Select Category</option>
                                <option value="running" >Running</option>
                                <option value="football" >Football</option>
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
                        placeholder="Product Details..."
                    ></textarea>
                </div>
                <Button className="ml-auto mt-3 rounded-lg">Create Product</Button>
            </div>
        </Modal>
    )
};
export default ProductModal;