import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardItem, updateCartQuantity } from "@/store/shop/cartSlice/cartSlice";
import { toast } from "@/hooks/use-toast";

export default function CartItemContent({cartItems}) {

  const {user} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const handelCartItemDelete = (getCartitem) =>{
    dispatch(deleteCardItem({userId:user?.id, productId:getCartitem?.productId}))
    .then(data => {
      if(data?.payload.success){
        toast({
          title : "card item is updated success successfull"
        })
      }
  })
  }

  const handleUpdatQuantity = (getCartitem, typeofaction)=>{
    dispatch(updateCartQuantity({userId:user?.id, productId:getCartitem?.productId, quantity:
      typeofaction === 'plus' ? 
      getCartitem?.quantity + 1 : getCartitem?.quantity -1
      
    })).then(data => {
        if(data?.payload.success){
          toast({
            title : "card item is updated success successfull"
          })
        }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img src={cartItems?.image} alt={cartItems?.title} className="w-20 h-20 rounded object-cover"/>

      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button 
            onClick={()=>handleUpdatQuantity(cartItems, 'minus')} 
            variant='Outline' 
            size='icon' 
            disabled={cartItems?.quantity === 1}
            className='w-8 h-8 rounded-full'>
            <Minus className="w-4 h-4"/>
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button  
            onClick={()=>handleUpdatQuantity(cartItems, 'plus')}
            variant='Outline' 
            size='icon' 
            className='w-8 h-8 rounded-full'>
            <Plus className="w-4 h-4"/>
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ${((cartItems?.salePrice > 0 ? cartItems.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}
        </p>
        <Trash onClick={()=>handelCartItemDelete(cartItems)} className=" cursor-pointer mt-1 " size={20}/>
      </div>
    </div>
  )
}
