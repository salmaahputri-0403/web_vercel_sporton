"use client";


import Button from "@/app/(landing)/component/ui/button";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import BankInfoList from "../../component/bank-info/bank-info-list";
import BankInfoModal from "../../component/bank-info/bank-info-modal";
import { Bank } from "@/app/types";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../component/ui/delete-modal";

const BankInfoManagemnt =()=>{
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBank, setSelectedBank]= useState<Bank|null>(null);
    const [Bank,setBank]= useState<Bank[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen]=useState(false);
    const [bankToDeleteId, setBankToDeleteId] = useState("");

    const fetchBank = async()=>{
            try{
                const data = await getAllBanks();
                setBank(data);
            } catch (error) {
                console.error("Failed to Fetch Bank", error);
            }
        };

    const handleCloseModal =()=>{
        setIsModalOpen(false);
        setSelectedBank(null);
    }
    const handleEdit = (bank: Bank) =>{
                setSelectedBank(bank);
                setIsModalOpen(true);
        };
    
        const handleDelete =(id:string) =>{
                setBankToDeleteId(id);
                setIsDeleteModalOpen(true);
        };
    
        const handleDeleteConfirm = async() =>{
                if (!bankToDeleteId) return;
                try{
                    await deleteBank(bankToDeleteId);
                    toast.success("Bank info deleted successfully");
                    setIsDeleteModalOpen(false);
                    setBankToDeleteId("");
                    fetchBank();
                } catch (error){
                    console.error("Failed to delete Bank info", error);
                    toast.error("Failed to delete Bank info");
                }
            }

    useEffect(()=>{
                fetchBank();
            },[]);


    return(
    <div>
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="font-bold text-2xl">Bank Info Management</h1>
                <p className="opacity-50">Manage destination accounts for customer transfers.</p>
            </div>
            <Button className="rounded-lg" onClick={()=>setIsModalOpen(true)}>
                <FiPlus size={24} />
                Add Bank Account
            </Button>
        </div>
        <BankInfoList banks={Bank} onEdit={handleEdit} onDelete={handleDelete}/>
        <BankInfoModal banks={selectedBank} isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={fetchBank}/>
        <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        />
    </div>
)
}
export default BankInfoManagemnt;