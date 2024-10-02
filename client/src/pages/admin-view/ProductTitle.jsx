import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductTitle({product ,
      setFormData ,
      setCurrentEditedId , 
      setOpenCreateProductDialog,
      handleDelete
    }) {
    
  return (
    <Card className="bg-white">
        <div>
            <div className="w-full max-w-sm mx-auto">
                <img 
                    src={product?.image}
                    alt={product?.title}
                    className='w-full h-[250px] md:h-[150px] object-cover rounded-t-lg border-b'
                />
            </div>
            <CardContent>
                <h2 className="text-xl font-bold my-2 line-clamp-1">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className={`
                    ${product?.salePrice > 0 ? "line-through" : " " } 
                    text-lg font-semibold text-primary`}>
                        ${product?.price}
                    </span>
                    {
                        product?.salePrice > 0 ? <span className="text-lg font-bold">${product?.salePrice}</span> :null
                    }
                   
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <Button onClick={()=>{
                    setOpenCreateProductDialog(true)
                    setCurrentEditedId(product?._id)
                    setFormData(product)
                }} className="px-5 hover:bg-slate-600 bg-slate-700 rounded text-white">Edit</Button>
                <Button onClick={()=>handleDelete(product?._id)} className="px-3 hover:bg-slate-600 bg-slate-700 rounded text-white">Delete</Button>
            </CardFooter>
        </div>
    </Card>
  )
}
