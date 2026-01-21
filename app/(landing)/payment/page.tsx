import PaymentOptions from "../component/payment/payment_option";
import PaymentSteps from "../component/payment/payment_step";

const PaymentSection =() =>{
    return(
            <main className="bg-gray-100 min-h-[80vh] py-30 pt-20">
                <div className="max-w-5xl mx-auto ">
                    <h1 className="text-5xl font-bold text-center py-5 mb-10">Payment</h1>
                    <div className="grid grid-cols-2 gap-14">
                        <PaymentOptions/>
                        <PaymentSteps/>
                    </div>
                </div>
            </main>
        
    )
}
export default PaymentSection;