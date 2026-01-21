type TButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "dark" |"ghost";
    size?: "normal"|"sm" ;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button =({children, className, variant ="primary", size="normal", ...props}:TButtonProps)=>{
    const baseStyles ="inline-flex gap-2 duration-300 justify-center items-center cursor-pointer hover:scale-105";

    const variants={
        primary :'bg-primary text-white hover:bg-primary/85',
        dark :'bg-dark text-white hover:bg-dark/85',
        ghost :'bg-transparent text-dark hover:bg-grey/100',
    }

    const sizes={
        normal: 'py-4 px-9 ',
        sm: 'py-[10p] px-7',
    }

    
    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
            </button>
    )

}
export default Button;