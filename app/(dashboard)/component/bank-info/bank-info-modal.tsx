import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import ImageUploadReview from "../ui/image-uplod-review";
import { useEffect, useState } from "react";
import { Bank } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";

type TBankInfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    banks: Bank | null;
    onSuccess: ()=>void
};



const BankInfoModal = ({isOpen,onClose,banks, onSuccess}:TBankInfoModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormdata] = useState<Partial<Bank>> ({
        accountName:"",
        accountNumber:"",
        bankName:"",
    });
    

    const isEditMode =!!banks;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [id]: id === "price" || id === "stock" ? Number(value) : value,
        }));
    };



    // handle submit
        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setIsSubmitting(true);
                try{
                    if (isEditMode) {
                        await updateBank(banks._id, formData);
                    } else {
                        await createBank(formData);
                    }

                    setFormdata({
                    accountName: "",
                    accountNumber: "",
                    bankName:"",
                    });
                        onSuccess?.();
                        onClose();
                        toast.success(
                            isEditMode
                            ? "Bank info updated successfully"
                            : "Bank info created succesfully",
                        );
                }catch (error){
                    console.error(isEditMode ? "Failed to update Bank Info" : "Failed to create Bank Info", error);
                    toast.error(isEditMode ? "Failed to update Bank Info" : "Failed to create Bank Info");
                } finally{
                    setIsSubmitting(false);
                }
            };



    useEffect(()=>{
        if (isEditMode && isOpen) {
                    setFormdata({
                        accountName: banks.accountName,
                        accountNumber: banks.accountNumber,
                        bankName:banks.bankName,
                    })
                }
                else if (isOpen){
                setFormdata({
                    accountName: "",
                    accountNumber: "",
                    bankName:"",
                });
        }
    },[banks,isOpen])

    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="bankName">BankName</label>
                            <input 
                                type="text" 
                                id="bankName" 
                                name="bankName"
                                placeholder="e. g. Mandiri, BCA, BRI" 
                                value={formData.bankName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="accountNumber">Account Number</label>
                            <input 
                                type="text" 
                                id="accountNumber" 
                                name="accountNumber"
                                placeholder="123124344234234" 
                                value={formData.accountNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="accountName">Account Name / Holder</label>
                            <input 
                                type="text" 
                                id="accountName" 
                                name="accountName"
                                placeholder="Holder Name as registered on the account" 
                                value={formData.accountName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>   
                <Button
                    className="ml-auto mt-3 rounded-lg"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    >
                    {isEditMode ? "Update Bank Info" : "Create Bank Info"}
                </Button>
            </form>
        </Modal>
    )
};
export default BankInfoModal;