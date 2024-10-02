import ProductImageUpolad from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFromElement } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editproduct, fetchallProducts } from "@/store/admin/productsSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTitle from "./ProductTitle";


const initailFormData = {
  image : null,
  title : '',
  description : '',
  category : '',
  brand : '',
  price : '',
  salePrice : '',
  totalStock :''
}

export default function AdminProduct() {

  const [OpenCreateProductDialog, setOpenCreateProductDialog] = useState(false)
  const [FormData , setFormData] = useState(initailFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImage, setUploadedImage] = useState('')
  const [imageLoadingState,setImageLoaingState] = useState(false)
  const dispatch = useDispatch()
  const {productList} = useSelector(state=>state.adminProduct)

  const [currentEditedId, setCurrentEditedId] = useState(null)
  

  function onSubmit(event){
    event.preventDefault()

    if(currentEditedId !== null){
      dispatch(editproduct({
        id:currentEditedId, FormData  
      })).then((data)=>{
        console.log(data, "edit");
        if(data?.payload?.success){
          dispatch(fetchallProducts())
          setOpenCreateProductDialog(false)
          setCurrentEditedId(null)
        }
        
      })
    }else{
      dispatch(addNewProduct({
        ...FormData,
        image : uploadedImage
      })).then((data)=>{
        if(data?.payload?.success){
          setFormData('')
          setImageFile(initailFormData)
          dispatch(fetchallProducts())
          setOpenCreateProductDialog(false)
          toast({
            title : 'product add successfully '
          })
        }
      })
    }
     

      


    
   
  }

  function isFormValid(){
    return Object.keys(FormData)
      .map((key)=>FormData[key] !== '')
      .every((item) => item)
  }


  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct({id:getCurrentProductId}))
    .then(data=>{
      if(data?.payload?.success){
        dispatch(fetchallProducts())
      }
    })
    
  }


  useEffect(()=>{
    dispatch(fetchallProducts())
  },[ dispatch])



  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
          <Button onClick={()=>setOpenCreateProductDialog(true)} 
            className="px-4 py-2 bg-slate-600 text-white rounded-md mt-2 mr-2">
            Add New Product
          </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList?.map((product,index) => 
              <ProductTitle key={index} 
              setFormData={setFormData} 
              product={product} 
              setCurrentEditedId={setCurrentEditedId} 
              setOpenCreateProductDialog={setOpenCreateProductDialog}
              handleDelete={handleDelete}
              />) 
              : null
        }
      </div>
      <Sheet 
        open={OpenCreateProductDialog} 
        onOpenChange={()=>{
          setOpenCreateProductDialog(false)
          setCurrentEditedId(null)
          setFormData(initailFormData)
        }
        }
      >
        <SheetContent side="right" className="overflow-auto bg-white">
            <SheetHeader>
              <SheetTitle>
                {
                  currentEditedId !== null ? " Edit Product" : "Add New Product"
                }
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpolad 
              imageLoadingState={imageLoadingState}
              setImageLoaingState={setImageLoaingState}
              imageFile={imageFile} 
              setImageFile={setImageFile} 
              uploadedImage={uploadedImage} 
              setUploadedImage={setUploadedImage}
              isEditMode={currentEditedId !== null}
              />
            <div className="py-2">
                <CommonForm
                    isBtnDisable={!isFormValid()}
                    FormData={FormData}
                    setFormData={setFormData}
                    buttonText={currentEditedId != null ? 'Edit' : 'Add'}
                    onSubmit={onSubmit}
                    formControls={addProductFromElement}
                />
            </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}
