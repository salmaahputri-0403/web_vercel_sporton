import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400","500","600","700","800"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "SportOn Admin - Login",
    description: "Engineered for endurance and designed for speed. Experience gear that moves as fast as you do. Premium fabrics. Unmatched comfort. Limitless motion.",
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
        <body className={`${poppins.variable} antialiased`}>
            <div>
                {children}
            </div>
        </body>
        </html>
    );
}
