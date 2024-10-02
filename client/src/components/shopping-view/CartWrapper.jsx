import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CartItemContent from "./CartItemContent";

export default function CartWrapper({cartItems, setOpenCartSheet}) {
  const navigate = useNavigate()

  const totalCartAmount = cartItems && cartItems.length > 0 ? 
              cartItems.reduce((sum, currentItem)=>
                sum + (
                currentItem?.salePrice > 0 
                ? currentItem?.salePrice 
                : currentItem?.price)*
                currentItem?.quantity,0): 0
  return (
    <SheetContent className= 'sm:max-w-md bg-white'>
        <SheetHeader>
            <SheetTitle>Your cart Header</SheetTitle>
        </SheetHeader>
        <div className="mt-5 space-y-4">
          {
            cartItems && cartItems.length > 0 ?
            cartItems?.map((item, index) => <CartItemContent key={index} cartItems={item}/>) : null
          }
        </div>
        <div className="mt-6 space-y-4">
            <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
            </div>
        </div>
        <Button onClick={()=>{
          navigate('/shop/checkout')
          setOpenCartSheet(false)
        }} className='w-full mt-6 bg-slate-800 text-white hover:bg-slate-900'>Checkout</Button>
    </SheetContent>
  )
}
