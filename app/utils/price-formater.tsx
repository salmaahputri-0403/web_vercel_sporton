const PriceFormater = (price: number)=>{
    const newFormat=Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 3,
                                }).format(price)
    return newFormat;
}
export default PriceFormater;