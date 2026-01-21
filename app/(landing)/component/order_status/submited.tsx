"use client";
import { PiX } from "react-icons/pi";
import Image from "next/image";
import Button from "../ui/button";
import { FiRefreshCw } from "react-icons/fi";

const OrderSubmitted =() =>{
    const reloaOrderStatus =()=>{
        window.location.reload()
    }
    return(
        <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
            <Image 
            src="/image/icon-order-status/icon-order-submitted.svg"
            alt="icon-order-submitted"
            width={117}
            height={117}
            className="mb-4"
            />
            <h2 className="mb-2 font-semibold text-2xl">Order Submitted !!</h2>
            <p className="mb-8 text-lg text-center">Your Order is recorded in our system, we are still confirming the payment status, please wait and your order status will be updated in less than 12 hours.</p>
            <Button variant="dark" className="w-full" onClick={reloaOrderStatus}>
                <FiRefreshCw size={18}/>
                Refresh Order Status
            </Button>
        </div>
    )
}
export default OrderSubmitted;