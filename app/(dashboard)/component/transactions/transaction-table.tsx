import { Transaction } from "@/app/types";
import PriceFormater from "@/app/utils/price-formater";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

const transactionData =[
    {
        date:"23/02/2026 19:32",
        customer :"John Doe",
        contact:"08231223123",
        total: 450000,
        status:"pending",
    },
    {
        date:"23/02/2026 19:32",
        customer :"John Doe",
        contact:"08231223123",
        total: 450000,
        status:"rejected",
    },
    {
        date:"23/02/2026 19:32",
        customer :"John Doe",
        contact:"08231223123",
        total: 450000,
        status:"paid",
    },
    
];
type TtransactionProps = {
    onViewDetails: (transaction:Transaction) => void;
    transaction:Transaction[];
};



const TransactionTable = ({onViewDetails,transaction}:TtransactionProps) => {
    const getStatusColor =(status:string)=>{
        switch(status.toLowerCase()){
            case "pending":
                return "bg-yellow-100 text-yellow-600 border-yellow-200";
            case "paid":
                return "bg-green-100 text-green-600 border-green-200";
            case "rejected":
                return "bg-red-100 text-red-600 border-red-200";
            default:
                return "bg-gray-100 text-gray-600 border-gray-200";
        }
    }

    return(
        <div className=" bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Customer</th>
                        <th className="px-6 py-4 font-semibold">Contact</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.map((data) => (
                        <tr key={data._id} className="boder-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 font-medium">
                                {new Date(data.createdAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </td>
                            <td className="px-6 py-4 font-medium">{data.customerName}</td>
                            <td className="px-6 py-4 font-medium">{data.customerContact}</td>
                            <td className="px-6 py-4 font-medium">{PriceFormater(parseInt (data.totalPayment))}</td>
                            <td className="px-6 py-4 font-medium">
                                <div className={`px-2 py-1 rounded-full border text-center w-fit text-sm uppercase ${getStatusColor(data.status)}`}>{data.status}</div>
                            </td>
                            <td className=" px-6 py-7.5 flex gap-3 text-gray-600 items-center h-full">
                                <button onClick={()=>onViewDetails(data)} className="flex item-center gap-2 cursor-pointer hover:bg-gray-100 w-fit py-1 px-2 rounded-md">
                                    <FiEye size={18}/>
                                    View Details
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TransactionTable ;