"use client";
import Image from "next/image";
import Link from "next/link";
import PopupCard from "../ui/card_popup";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import Button from "../ui/button";
import { useCartStore } from "@/app/hooks/use-cart-store";
const Header =() => {
    const {items} = useCartStore()
    const [isPopupCartOpen, setIsPopupCart] =useState(false)
    return (
    <header className="fixed w-full z-20 backdrop-blur-xl bg-white/50">
        <div className="flex justify-between gap-10 container mx-auto py-7">
            <Link href="/">
                <Image 
                src="/image/logo.svg"
                alt="SportOn Logo" 
                width={127} 
                height={30}
                className="cursor-pointer" />
            </Link>
            <nav className="flex gap-44 font-medium">
                <Link href="#" className="relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-0.75 after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1">Home</Link>
                <Link href="#">Category</Link>
                <Link href="#">Explore Products</Link>
            </nav>
            <div className=" relative flex gap-10">
                <FiSearch size={24} />
                <button className="relative cursor-pointer" onClick={()=>setIsPopupCart(!isPopupCartOpen)}>
                    <FiShoppingBag size={24} />
                    {items.length ? (<div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white text-center">
                        {items.length}
                    </div>):(
                        <></>
                    )}
                    
                </button>
                    {isPopupCartOpen && <PopupCard/> }
            </div>
        </div>
    </header>);
};
export default Header;