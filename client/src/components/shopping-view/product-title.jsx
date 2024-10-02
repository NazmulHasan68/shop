import { brandOptionMap, categoryOptionMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export default function ShoppingProductTitle({product, handleGetProductDetails, handleAddtocart}) {
  return (
    <Card className='w-full max-w-sm mx-auto bg-white shadow hover:shadow-xl transition-shadow'>
        <div onClick={()=>handleGetProductDetails(product?._id)}>
            <div className="relative">
                <img 
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[240px] sm:h-[180px] md:h-[200px] object-cover rounded-t-lg"
                />
                {
                    product?.salePrice > 0 ? 
                    <Badge className='absolute top-1 left-1 bg-red-500 hover:bg-red-700 text-white'>Sale</Badge> : null
                }
            </div>
            <CardContent className ='p-1'>
                <h2 className="text-xl font-bold my-1 line-clamp-1">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[16px] font-semibold px-1 text-slate-500">
                        {categoryOptionMap[product?.category]}
                    </span>
                    <span  className="text-[16px] font-semibold px-1 text-slate-500">
                        {brandOptionMap[product.brand]}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <span className={`${product?.salePrice > 0 ? ' line-through' : '' } text-sm font-semibold text-slate-500`}>${product?.price}</span>
                    {
                        product?.salePrice > 0 ?  <span  className="text-sm font-semibold text-slate-500">${product?.salePrice}</span> : null
                    }
                </div>
            </CardContent>
        </div>
        <CardFooter>
                <Button onClick={()=>handleAddtocart(product._id)} className='w-full text-sm bg-slate-500 text-white font-semibold hover:bg-slate-600'>Add to Cart</Button>
        </CardFooter>
    </Card>
  )
}
