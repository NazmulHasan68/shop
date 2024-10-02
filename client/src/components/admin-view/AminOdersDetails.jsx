import { Separator } from "@radix-ui/react-select";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import CommonForm from "../common/form";
import { useState } from "react";

export default function AminOdersDetails() {
    const intialFormData = {
        status : ''
    }

    const handleupdateStatus = (e)=>{
        e.preventDefault()
    }
   const [formData , setFormData] = useState(intialFormData)
  return (
    <DialogContent className='sm:max-w-[600px] bg-white'>
        <div className="grid gap-6 ">
            <div className="grid gap-2 mt-4 p-2 ">

                <div className="flex items-center justify-between ">
                    <p className="font-medium">Order ID</p>
                    <Label>1233</Label>
                </div>
                <div className="flex items-center justify-between ">
                    <p className="font-medium">Order Date</p>
                    <Label>12/03/2012</Label>
                </div>
                <div className="flex items-center justify-between ">
                    <p className="font-medium">Order Price</p>
                    <Label>$123</Label>
                </div>
                <div className="flex items-center justify-between ">
                    <p className="font-medium">Order Sataus</p>
                    <Label>In Process</Label>
                </div>
            </div>
            <Separator/>
            <div className="grid gap-2 ">
                <div className="grid gap-2">
                    <div className="font-medium">Order Details</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span>Product One</span>
                            <span>$100</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="grid gap-2 ">
                <div className="grid gap-2">
                    <div className="font-medium">Shipping Info</div>
                    <div className="grid gap-0.5 text-gray-500">
                        <span>NAzmul hasan</span>
                        <span>Address</span>
                        <span>city</span>
                        <span>pincode</span>
                        <span>phone</span>
                    </div>
                </div>
            </div>
            <div>
                <CommonForm
                    formControls={[
                        {
                            label : "Order Status",
                            name : 'status',
                            componentType : 'select',
                            options : [
                                {id: 'pending', label : 'Pending'},
                                {id: 'inProcess', label : 'In Process'},
                                {id : 'inShipping', label : "In Shippin"},
                                {id : "delivered", label : "Delivered"},
                                {id : "rejected", label : "Rejected"},
                           ]
                        },
                    ]}
                    FormData={formData}
                    setFormData={setFormData}
                    buttonText={'Update order status'}
                    onSubmit={handleupdateStatus}
                    />
            </div>
        </div>
    </DialogContent>
  )
}
