"use client";
import { PiX } from "react-icons/pi";
import Image from "next/image";
import Button from "../ui/button";
import { FiRefreshCw } from "react-icons/fi";

const OrderConfirm =() =>{

    return(
        <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
            <Image 
            src="/image/icon-order-status/icon-order-confirmed.svg"
            alt="icon-order-confirm"
            width={117}
            height={117}
            className="mb-4"
            />
            <h2 className="mb-2 font-semibold text-2xl">Order Confirm !!</h2>
            <p className="mb-8 text-lg text-center">We have received your payment, and your order is currently processed by our staff, just wait until your favorite sportswear arrive in your home. We will contact you in Whatsapp for further shipping updates.</p>
            
        </div>
    )
}
export default OrderConfirm;