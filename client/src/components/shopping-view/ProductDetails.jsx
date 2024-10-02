import { Separator } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star, StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, fetchcartItem } from "@/store/shop/cartSlice/cartSlice";
import { toast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/productSlice";

export default function ProductDetails({open, setOpen, ProductDetails}) {

    const {user} = useSelector(state=>state.auth)
    const disptach = useDispatch()
    const handleAddtocart=(getcurrentProductId)=>{
        console.log(getcurrentProductId);
        
      disptach(addtocart({
                    userId:user?.id, 
                    productId:getcurrentProductId, 
                    quantity:1
                }))
      .then((data)=>{
        if(data?.payload?.success){
          disptach(fetchcartItem({userId:user?.id}))
          toast({
            title : "product is added to cart"
          })
        }
      })
    }


    const handelDialogClose = () =>{
        setOpen(false)
        disptach(setProductDetails())
    }
  
  return (
    <Dialog open={open} onOpenChange={handelDialogClose}>
        <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white opacity-90'>
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={ProductDetails?.image}
                    alt={ProductDetails?.title}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover" 
                />
            </div>
            <div className="max-h-[280px] md:max-h-[420px] overflow-auto scrollbar">
                <div>
                    <h1 className="text-md md:text-2xl font-extrabold">{ProductDetails?.title}</h1>
                    <p className="text-slate-500 text-sm md:text-md my-2 md:my-4 font-medium">{ProductDetails?.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-sm md:text-md font-bold  text-slate-800 ${ProductDetails?.salePrice > 0 ? 'line-through' : ''} `}>${ProductDetails?.price}</p>
                    {
                        ProductDetails?.salePrice > 0 ? <p className="text-sm md:text-sm font-bold text-slate-900">${ProductDetails?.salePrice}</p> : null
                    }
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 md:gap-2">
                        <StarIcon className="w-3 md:w-5  md:h-5 h-3 fill-slate-900 rounded-full "/>
                        <StarIcon className="w-3 md:w-5  md:h-5 h-3 fill-slate-900 rounded-full "/>
                        <StarIcon className="w-3 md:w-5  md:h-5 h-3 fill-slate-900 rounded-full "/>
                        <StarIcon className="w-3 md:w-5  md:h-5 h-3 fill-slate-900 rounded-full "/>
                    </div>
                    <span className="text-slate-600 text-sm md:text-medium">(4.5)</span>
                </div>
                <div className="mb-5">
                    <Button onClick={()=>handleAddtocart(ProductDetails?._id)} className='mt-2 md:mt-5 text-sm md:text-md bg-slate-700 w-full hover:bg-slate-800 text-white'>Add to Cart</Button>
                </div>
                <Separator/>
                <div className="max-h-[200px] md:max-h-[300px] overflow-auto">
                    <h2 className="text-sm md:texl-xl font-bold mb-2 md:mb-4">Reviews</h2>

                    <div className="grid gap-2 md:gap-4">
                            <div className="flex gap-4">
                                <Avatar className="w-6 md:w-10 h-6 md:h-10 border bg-slate-400 text-white">
                                    <AvatarFallback className='text-[10px] md:text-xl'>NH</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm md:text-md">Nazmul Hasan</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                    </div>
                                    <p className="text-[10px] md:text-sm text-slate-500 ">This is an awasome product</p>
                                </div>
                            </div>
                    </div>
                    <div className="grid gap-2 md:gap-4">
                            <div className="flex gap-4">
                                <Avatar className="w-6 md:w-10 h-6 md:h-10 border bg-slate-400 text-white">
                                    <AvatarFallback className='text-[10px] md:text-xl'>NH</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm md:text-md">Nazmul Hasan</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                        <StarIcon className="w-3 h-3 fill-slate-900"/>
                                    </div>
                                    <p className="text-[10px] md:text-sm text-slate-500 ">This is an awasome product</p>
                                </div>
                            </div>
                    </div>
                    <div className="mt-2 flex gap-1 md:gap-4 ">
                        <Input placeholder="Write a review ..."/>
                        <Button className='bg-slate-800 text-slate-50 text-[12px] md:text-medium'>Sumbit</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
