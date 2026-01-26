import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "./component/layout/sidebar";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400","500","600","700","800"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "SportOn Admin",
    description: "Admin dashboard for SportOn",
    icons:{
        icon:"/logo_favicon.svg",
    }
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body
            className={`${poppins.variable} antialiased`}>
            <div className="flex min-h-screen bg-white">
                <Sidebar/>
                <main className="flex-1 ml-80 p-14 bg-[#F7F9FA] min-h-screen">
                    <div className="max-w-6xl mx-auto">{children}</div>
                </main>
            </div>
        </body>
        </html>
    );
}
