

import { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export default function ProductImageUpolad({
    imageFile,
   setImageFile ,
   uploadedImage, 
   setUploadedImage, 
   setImageLoaingState, 
   imageLoadingState,
   isEditMode
  }) {

const inputRef = useRef(null)
const handelImageFileChange =(event)=>{
    const selectedFile =  event.target.files?.[0]
    if(selectedFile){
        setImageFile(selectedFile)
    }
    
}


  const handleDragOver = (event) =>{
    event.preventDefault()
    
  }
  const handelDrop = (event)=>{
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if(droppedFile) {
      setImageFile(droppedFile)
    }
  }

  const handelRemoveImage = ()=>{
    setImageFile(null)
    if(inputRef.current){
      inputRef.current.vale = ''
    }
  }
  async function uploadImageToCloudianry() {
    setImageLoaingState(true)
    const data = new FormData();
    data.append('my_file',imageFile)
    const response = await axios.post('http://localhost:5000/api/admin/product/upload-image',data)
    if(response?.data?.success) {
      setUploadedImage(response.data.result.url)
      setImageLoaingState(false)
    } 
  }

  useEffect(()=>{
    if(imageFile !== null){
      uploadImageToCloudianry()
    }
  },[imageFile])


  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div 
        onDragOver={handleDragOver} 
        onDrop={handelDrop} 
        className={`${isEditMode ? ' opacity-50' : " "} border-2 border-dashed rounded-lg p-4 mt-2`}
      > 
        <Input 
            id="imageUpload" 
            className="hidden"
            type="file"  
            ref={inputRef} 
            onChange={handelImageFileChange}
            disabled ={isEditMode}
        />
        {
          !imageFile ?( <Label htmlFor="imageUpload" 
            className={`${isEditMode ? 'cursor-not-allowed' : ' '} flex flex-col items-center justify-center h-32 cursor-pointer` }>
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
            <span>Drag & drop or Clieck to Upload image</span>
          </Label> 
          ):(
            imageLoadingState ? <Skeleton className='h-10 bg-gray-500'/> : 
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 h-8 text-primary mr-2"/>
              </div>
              <p className="text-sm font-medium">{imageFile?.name}</p>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handelRemoveImage}>
                <XIcon className="w-4 h-4"/>
                <span className="sr-only">Remove File</span>
              </Button>
          </div>
          )
        }

      </div>
    </div>
  )
}
