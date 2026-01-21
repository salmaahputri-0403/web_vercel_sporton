"use client";
import { PiX } from "react-icons/pi";
import Image from "next/image";
import Button from "../ui/button";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

const OrderRejected =() =>{

    return(
        <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
            <div className="w-20 h-20 bg-primary-light rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-15">
                <FiAlertCircle size={52}/>
            </div>
            <h2 className="mb-2 font-semibold text-2xl">Order Rejected !!</h2>
            <p className="mb-8 text-lg text-center">I'm sorry your order is rejected because your payment proof is not valid</p>
            
        </div>
    )
}
export default OrderRejected;