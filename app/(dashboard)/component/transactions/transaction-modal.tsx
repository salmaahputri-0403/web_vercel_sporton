import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import { useState } from "react";
import PriceFormater from "@/app/utils/price-formater";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

type TransactionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction |null;
    onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
};



const TransactionModal = ({isOpen,onClose, transaction, onStatusChange}:TransactionModalProps) => {

    const [isUpdating, setIsUpdating] = useState(false);
    if(!transaction) return;
    const handleStatusUpdate = async (status: "paid" | "rejected") => {
        setIsUpdating(true);
        try {
            await onStatusChange(transaction._id, status);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
            <div className="flex  gap-6">
                <div className="min-w-50">
                    <h4 className="font-semibold text-xs">Payment Proof</h4>
                        {transaction.paymentProof ? (
                            <Image
                            src={getImageUrl(transaction.paymentProof)}
                            alt="payment proof"
                            width={200}
                            height={401}
                            />
                        ) : (
                            <div className="text-center p-4">
                            <p className="text-sm">No Payment proof uploaded</p>
                            </div>
                        )}
                </div>
                <div className="w-full">
                        <h4 className="font-semibold text-xs">Order Details</h4>
                        <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-2.5 text-xs">
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Date</div>
                                <div className="text-right">
                                    {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Customer</div>
                                <div className="text-right">{transaction.customerName}</div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Contact</div>
                                <div className="text-right">{transaction.customerContact}</div>
                            </div>
                            <div className="flex whitespace-nowrap justify-between gap-10 font-medium">
                                <div className="opacity-50">Shipping Address</div>
                                <div className="text-right">{transaction.customerAddress}</div>
                            </div>
                        </div>

                        <h4 className="font-semibold text-xs mt-2">Items Purchased</h4>
                        <div className="space-y-3">
                            {
                                transaction.purchasedItems.map((item,index)=>(
                                    <div className="items-center border border-gray-200 rounded-lg p-2 flex gap-2">
                                        <div className="bg-gray-100 rounded aspect-square w-8 h-8">
                                            <Image
                                            src={getImageUrl(item.productId.imageUrl)}
                                            alt="product-image"
                                            width={30}
                                            height={30}
                                            />
                                        </div>
                                        <div className="font-medium text-xs">{item.productId.name}</div>
                                        <div className="font-medium ml-auto text-xs">{item.qty}</div>
                                    </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-xs mt-6">
                            <h4 className="font-semibold ">Total</h4>
                            <div className="text-primary font-semibold">{PriceFormater(parseInt(transaction.totalPayment))}</div>
                        </div>

                        <div className="flex justify-end mt-15 gap-5 ">
                            {
                                isUpdating? (
                                    <div className="flex text-center">Updating...</div>
                                ):(
                                    <>
                                        <Button 
                                            className="bg-primary-light! text-primary! rounded-md" 
                                            size="standard"
                                            onClick={()=>handleStatusUpdate("rejected")}
                                            disabled={isUpdating}
                                            >
                                            <FiX size={20}/>
                                            Reject
                                        </Button>
                                        <Button 
                                            className=" text-white bg-[#50C252]! rounded-md" 
                                            size="standard"
                                            onClick={()=>handleStatusUpdate("paid")}
                                            disabled={isUpdating}
                                        >
                                            <FiCheck size={20}/>
                                            Approve
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                </div>
            </div>
        </Modal>
    )
};
export default TransactionModal;