"use client";


import Button from "@/app/(landing)/component/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../component/products/products-table";
import ProductModal from "../../component/products/product-modal";
import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { getAllProducts } from "@/app/services/product.service";
import { deleteProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import DeleteModal from "../../component/ui/delete-modal";

const ProductManagemen =()=>{
    const[isModalOpen, setisModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<Product | null>(null);
    const [productToDeleteId, setProductToDeleteId] = useState("");

    const fetchProducts = async()=>{
        try{
            const data = await getAllProducts();
            if(data){
                setProducts(data);
            }
        } catch (error) {
            console.error("Failed to Fetch Products", error);
        }
    };

    const handleEdit = (product: Product) =>{
        setSelectedProductId(product);
        setisModalOpen(true);
    };

    const handleDelete =(id:string) =>{
        setProductToDeleteId(id);
        setIsDeleteModalOpen(true);
    }

    const handleDeleteConfirm = async() =>{
        if (!productToDeleteId) return;
        try{
            await deleteProduct(productToDeleteId);
            fetchProducts();
            toast.success("Product deleted successfully");
            setIsDeleteModalOpen(false);
            setProductToDeleteId("");
        } catch (error){
            console.error("Failed to delete product", error);
            toast.error("Failed to delete product");
        }
    };

    useEffect(()=>{
        fetchProducts();
    },[]);
    
    const handleCloseModal =()=>{
        setisModalOpen(false);
        setSelectedProductId(null);
    }

    return(
    <div>
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="font-bold text-2xl">Product Management</h1>
                <p className="opacity-50">Manage your inventory, prices and stock.</p>
            </div>
            <Button className="rounded-lg" onClick={()=>setisModalOpen(true)}>
                <FiPlus size={24} />
                Add Product
            </Button>
        </div>
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
        <ProductModal products={selectedProductId} onSuccess={fetchProducts} isOpen={isModalOpen} onClose={handleCloseModal}/>
        <DeleteModal isOpen={isDeleteModalOpen} onClose={()=>setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm}/>
    </div>
    )

    
}
export default ProductManagemen;