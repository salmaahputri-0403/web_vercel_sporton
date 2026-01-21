import { FiCreditCard } from "react-icons/fi";
import CardWithHeader from "../ui/card_header";
import { getAllBanks } from "@/app/services/bank.service";


const paymentlist=[
    {
        bank_name: "BCA",
        account_number: 123182312,
        account_holder: "PT SportOn Digital"
    },
    {
        bank_name: "Mandiri",
        account_number: 83923912013203123,
        account_holder: "PT SportOn Digital"
    },
    {
        bank_name: "BTPN",
        account_number: 5238218923,
        account_holder: "PT SportOn Digital"
    },


]
const PaymentOptions = async() =>{
    const banks = await getAllBanks()

    return(
        <CardWithHeader title="Payment Options">
            {
                banks.map((payment,index)=>(
                    <div  className="flex gap-5 p-5 border-b border-green-100" key={index}>
                        <div className="bg-blue-100 p-4 text-blue-500 h-fit self-center">
                            <FiCreditCard size={24}/>
                        </div>
                        <div className="self-center">
                            <div className="font-bold">{payment.bankName}</div>
                            <div className="text-sm">{payment.accountNumber}</div>
                            <div className="text-sm opacity-70 ">{payment.accountName}</div>
                        </div>
                        <div className="px-2 py-1 bg-blue-100 text-gray-500 text-xs ml-auto h-fit self-center">Bank Transfer</div>

                    </div>
                )
                )
            }
        </CardWithHeader>
    )

}
export default PaymentOptions;