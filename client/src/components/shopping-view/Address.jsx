import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deletedAddress, editAddress, fetchAllAddress } from "@/store/shop/AddreeSlice/addressSlice";
import AddressCard from "./addressCard";
import { toast } from "@/hooks/use-toast";
import { Title } from "@radix-ui/react-dialog";

const intialAddressFormData = {
    address : '',
    city : '',
    phone : '',
    pincode : '',
    notes : ''
}


export default function Address({setcurrentselectedAddress}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const [formdata, setformData] = useState(intialAddressFormData) 
    const {addressList} = useSelector(state =>state.shopingaddress)
    const [currentEditedId , setcurrentEditedId] = useState(null)

    const handelManageAddress = (e) =>{
        e.preventDefault()

        if(addressList.length >= 3 && currentEditedId === null){
            setformData(intialAddressFormData)
            toast({
                title: "You can add 3 address",
                variant : 'destructive'
            })

            return
        }

        currentEditedId !== null ? 
            dispatch(editAddress({
                userId: user?.id , addressId:currentEditedId, formdata
            })).then(data=>{
                if(data?.payload?.success){
                    dispatch(fetchAllAddress(user?.id))
                    setcurrentEditedId(null)
                    setformData(intialAddressFormData)
                }
            }) :
            dispatch(addNewAddress({
                ...formdata,
                userId : user?.id
            })).then(data => {
                if(data?.payload?.success){
                    dispatch(fetchAllAddress(user?.id))
                    setformData(intialAddressFormData)
                }
            })

    }
  
    const isFormValid = () =>{
        return Object.keys(formdata)
        .map((key)=>formdata[key]?.trim() !== "")
        .every((item)=>item)
        
    }

    useEffect(()=>{
        dispatch(fetchAllAddress(user?.id))
    },[dispatch])

    
    const handleDeleteAddress = (getcurrentAddress) =>{
        dispatch(deletedAddress({userId: user?.id , addressId:getcurrentAddress?._id}))
        .then(data=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddress(user?.id))
            }
        })
    }

    const handleEditAddress = (getcurrentAddress) =>{ 
        setcurrentEditedId(getcurrentAddress?._id)
        setformData({
            ...formdata,
            address : getcurrentAddress.address,
            city :  getcurrentAddress.city,
            phone :  getcurrentAddress.phone,
            pincode :  getcurrentAddress.pincode,
            notes :  getcurrentAddress.notes
        })
    }
    

  return (
   <Card className="mt-3">
    <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {
            addressList &&  addressList?.length > 0 ?
            addressList?.map((sigleAddressItem , index)=> (
            <AddressCard key={index} 
                    addressInfo={sigleAddressItem} 
                    handleDeleteAddress={handleDeleteAddress}
                    handleEditAddress={handleEditAddress}
                    setcurrentselectedAddress = {setcurrentselectedAddress}
            />)):null
        }
    </div>
    <CardHeader>
        <CardTitle>{currentEditedId !== null ? "Edit Address" : 'Add New address'}</CardTitle>
    </CardHeader>
    <CardContent className = ' space-y-4'>
        <CommonForm
            formControls={addressFormControls}
            FormData={formdata}
            setFormData={setformData}
            buttonText={currentEditedId !== null ? "Edit" : 'Add'}
            onSubmit={handelManageAddress}
            isBtnDisable={!isFormValid()}
        />
    </CardContent>
   </Card>
  )
}
