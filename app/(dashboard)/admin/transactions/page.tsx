"use client";


import Button from "@/app/(landing)/component/ui/button";
import { FiPlus } from "react-icons/fi";

import { useEffect, useState } from "react";
import TransactionTable from "../../component/transactions/transaction-table";
import TransactionModal from "../../component/transactions/transaction-modal";
import { Transaction } from "@/app/types";
import { getAllTransaction, updateTransaction } from "@/app/services/transaction.service";
import { toast } from "react-toastify";

const TransactionManagemnt =()=>{
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction]= useState<Transaction|null>(null);
    const [transaction,setTransaction]= useState<Transaction[]>([]);

    const fetchTransactions = async()=>{
            try{
                const data = await getAllTransaction();
                setTransaction(data);
                
            } catch (error) {
                console.error("Failed to Fetch Transaction", error);
            }
    };

    const handleCloseModal =()=>{
        setIsModalOpen(false);
        setSelectedTransaction(null);
    }
    const handleViewDetails =(transaction:Transaction)=>{
        setIsModalOpen(true);
        setSelectedTransaction(transaction);
    };
    const handleStatusChange = async(id:string, status:"paid"|"rejected")=> {
        try{
            const formData= new FormData();
            formData.append("status", status);
            await updateTransaction(id, formData);
            toast.success("Transaction status updated");
            await fetchTransactions();
        } catch (error) {
            console.error("Failed to update transaction status", error);
            toast.error("Failed to update transaction status");
        } finally {
            setIsModalOpen(false);
        }
        
    }

    useEffect(() => {
    fetchTransactions();
    }, []);



    return(
    <div>
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="font-bold text-2xl">Transaction Management</h1>
                <p className="opacity-50">Verify incoming payments and manage orders.</p>
            </div>
            
        </div>
        <TransactionTable transaction={transaction} onViewDetails={handleViewDetails}/>
        <TransactionModal transaction={selectedTransaction} onStatusChange={handleStatusChange} isOpen={isModalOpen} onClose={handleCloseModal}/>
    </div>
)
}
export default TransactionManagemnt;