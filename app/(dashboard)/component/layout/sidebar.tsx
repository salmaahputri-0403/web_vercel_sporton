"use client";

import { logout } from "@/app/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import { FiBox, FiCreditCard, FiLayers, FiLogOut, FiShoppingCart } from "react-icons/fi";
const Sidebar =() => {
    const pathname = usePathname();
    const {push} = useRouter();

    
    const menuItems =[
        {
            name:"Products",
            icon: FiBox,
            link:"/admin/product",
        },
        {
            name:"Categories",
            icon: FiLayers,
            link:"/admin/categories",
        },
        {
            name:"Transactions",
            icon: FiShoppingCart,
            link:"/admin/transactions",
        },
        {
            name:"Bank Inforations",
            icon: FiCreditCard,
            link:"/admin/bank-info",
        }
    ];

    const handleLOgout = () => {
        logout();
        push("/admin/login");
    }


    return(
    <aside className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
        <div className="py-8 px-14 border-b border-gray-200">
            <Image 
                src="/image/logo-admin.svg" 
                alt="SportOn Admin" 
                width={215} 
                height={36}
            />

        </div> 
        <div className="flex flex-col gap-2 mt-12 p-5">
            {menuItems.map((item, index) => {
                const isActive = item.link === pathname;
                return (
                    <Link 
                        href={item.link} 
                        key={index} 
                        className={`flex gap-3 items-center py-2 px-4.5 rounded-r-lg font-medium
                        ${isActive ? 'bg-primary/15 text-primary':'hover:bg-gray-100 duration-300'}`}>
                        <item.icon size={24}/>
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </div>
        <button 
            onClick={handleLOgout}
            className="cursor-pointer flex gap-3 font-medium py-3 px-4.5 mx-5 hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-10">
                <FiLogOut size={24} />
            Logout
        </button>
    </aside>
)
    
}
export default Sidebar;