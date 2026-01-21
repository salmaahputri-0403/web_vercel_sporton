"use client"

import OrderInfoSection from "../component/checkout/order-information";
import CartItemSection from "../component/checkout/cart-item";
import { useState } from "react";
import { CustomerInfo, useCartStore } from "@/app/hooks/use-cart-store";
import { useRouter } from "next/navigation";
const CheckoutSection =() =>{
    const {push} =useRouter();
    const {customerInfo, setCustomerInfo}= useCartStore();
    
    const [formData, setFormData] = useState<CustomerInfo>({
        customerName:"",
        customerContact:null,
        customerAddress:"",
    });

    const handlePayment =() =>{
        if( !formData.customerName||
            !formData.customerContact ||
            !formData.customerAddress
        ){
            alert("Please fill in all fields");
            return;
        }


        setCustomerInfo(formData);
        push("/payment");
    };

    return(
            <main className="bg-gray-100 min-h-[80vh] py-30 pt-20">
                <div className="max-w-5xl mx-auto ">
                    <h1 className="text-5xl font-bold text-center py-5 mb-10">Checkout  Now</h1>
                    <div className="grid grid-cols-2 gap-14">
                        <OrderInfoSection formData={formData} setFormData ={setFormData}/>
                        <CartItemSection handlePayment ={handlePayment}/>
                    </div>
                </div>
                
            </main>
        
    )
}
export default CheckoutSection;