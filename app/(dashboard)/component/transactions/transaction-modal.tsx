import Button from "@/app/(landing)/component/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import { useState } from "react";
import PriceFormater from "@/app/utils/price-formater";
import { FiCheck, FiX } from "react-icons/fi";

type TransactionModalProps = {
    isOpen: boolean;
    onClose: () => void;
};



const TransactionModal = ({isOpen,onClose}:TransactionModalProps) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
            <div className="flex  gap-6">
                <div>
                    <h4 className="font-semibold text-xs">Payment Proof</h4>
                    <Image src="/image/payment/payment-prof-dummy.png"
                        alt="Payment Proof"
                        width={200}
                        height={401}
                    />
                </div>
                <div>
                        <h4 className="font-semibold text-xs">Order Details</h4>
                        <div className="bg-gray-100 rounded-md p-4 flex flex-col gap-2.5 text-xs">
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Date</div>
                                <div className="text-right">23/02/2026 19:32</div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Customer</div>
                                <div className="text-right">John Doe</div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Contact</div>
                                <div className="text-right">08123456789</div>
                            </div>
                            <div className="flex whitespace-nowrap justify-between gap-10 font-medium">
                                <div className="opacity-50">Shipping Address</div>
                                <div className="text-right">Merdeka Street, Jakarta, Indonesia, 332122</div>
                            </div>
                        </div>

                        <h4 className="font-semibold text-xs mt-2">Items Purchased</h4>
                        <div className="items-center border border-gray-200 rounded-lg p-2 flex gap-2">
                            <div className="bg-gray-100 rounded aspect-square w-8 h-8">
                                <Image
                                src="/image/product/product-1.png"
                                alt="product-image"
                                width={30}
                                height={30}
                                />
                            </div>
                            <div className="font-medium text-xs">SportsOn Hyperfast Shoes</div>
                            <div className="font-medium ml-auto text-xs">3 units</div>
                        </div>

                        <div className="flex justify-between text-xs mt-6">
                            <h4 className="font-semibold ">Total</h4>
                            <div className="text-primary font-semibold">{PriceFormater(120000)}</div>
                        </div>

                        <div className="flex justify-end mt-15 gap-5 ">
                            <Button className="bg-primary-light! text-primary! rounded-md" size="standard">
                                <FiX size={20}/>
                                Reject
                            </Button>
                            <Button className=" text-white bg-[#50C252]! rounded-md" size="standard">
                                <FiCheck size={20}/>
                                Approve
                            </Button>
                        </div>
                </div>
            </div>
        </Modal>
    )
};
export default TransactionModal;