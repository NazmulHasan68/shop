import Address from '@/components/shopping-view/Address'
import img from '../../assets/account/banner1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import CartItemContent from '@/components/shopping-view/CartItemContent'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { createNewOrder } from '@/store/shop/OrderSlice/orderSlice'


export default function ShopingCheckout() {
  const {cartItems } = useSelector(state=>state.ShopingCart)
  const {user } = useSelector(state=>state.auth)
  const [currentselectedAddress, setcurrentselectedAddress] = useState(null)
  const dispatch = useDispatch()

  
  const totalCartAmount = cartItems?.items && cartItems?.items?.length > 0 ? 
  cartItems?.items?.reduce((sum, currentItem)=>
    sum + (
    currentItem?.salePrice > 0 
    ? currentItem?.salePrice 
    : currentItem?.price)*
    currentItem?.quantity,0): 0

    console.log(currentselectedAddress);
    
    const handelinitiatepaypalPayment = ()=>{
      const orderDate ={
        userId : user?.id,
        cartItems: cartItems?.items?.map(sigleCartItem =>({
          productId :sigleCartItem?.productId,
          title:sigleCartItem?.title,
          image : sigleCartItem?.image,
          price: sigleCartItem?.salePrice > 0 ? sigleCartItem?.price : 0,
          quantity:sigleCartItem?.quantity
        })), 
        addressInfo :{
          addressId :currentselectedAddress?._id,
          address :currentselectedAddress?.address,
          city:currentselectedAddress?.city,
          pincode:currentselectedAddress?.pincode,
          phone:currentselectedAddress?.phone
        },
        orderStatus : 'pending',
        paymentMethod : 'paypal',
        paymentSatus : 'pending',
        totalAmount : totalCartAmount,
        orderDate : new Date(),
        oderUpdateDate : new Date(),
        paymentId : '',
        payerId : ''
      }
      dispatch(createNewOrder(orderDate))
      .then((data)=>{
        console.log(data,"this is data"); 
      })
    }


  return (
    <div className="flex flex-col">
      <div className=" relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center"/>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5  mt-5 p-5'> 
        <Address setcurrentselectedAddress={setcurrentselectedAddress}/>
        <div className='flex flex-col gap-4 mt-3 p-3 rounded-md shadow-md border'>  
          {
            cartItems?.items && cartItems?.items?.length > 0 ?
            cartItems?.items?.map((cartItem, index) =><CartItemContent key={index} cartItems={cartItem}/>) : null
          }
           <div className="mt-6 space-y-4 border-t">
              <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <div className='mt-4 w-full'>
              <Button
                onClick={handelinitiatepaypalPayment}
                className='w-full text-white hover:bg-slate-900 rounded bg-slate-800'>
                  Checkout with Paypal
              </Button>
            </div>
        </div>
       
      </div>
    </div>
  )
}
