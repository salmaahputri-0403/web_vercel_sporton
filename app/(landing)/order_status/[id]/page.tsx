import OrderConfirm from "../../component/order_status/order-confirm";
import OrderSubmitted from "../../component/order_status/submited";
import { getTransactionById } from "@/app/services/transaction.service";
import { TPageProps } from "../../product/[id]/page";
import OrderRejected from "../../component/order_status/order-rejected";

const OrderStatus =async({params}:TPageProps) =>{
    const {id}= await params;
    const transaction = await getTransactionById(id);
    console.log("transaction",transaction);
    return(
        <main className="bg-gray-100 min-h-[80vh] py-30">
                <div className="max-w-5xl mx-auto ">
                    <h1 className="text-5xl font-bold text-center py-5 mb-10">Order Status</h1>
                </div>
                    {transaction.status === "paid"&& <OrderConfirm/>}
                    {transaction.status ==="pending"&& <OrderSubmitted/>}
                    {transaction.status === "rejected"&& <OrderRejected/>}
                
                
                        
                
            </main>
    )
}
export default OrderStatus;