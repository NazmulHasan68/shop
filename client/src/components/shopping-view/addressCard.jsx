import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

export default function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress, setcurrentselectedAddress}) {

  return (
    <Card onClick={()=>setcurrentselectedAddress(addressInfo)}>
        <CardContent className="grid gap-4 p-1 pt-2">
            <Label>Address :  {addressInfo?.address}</Label>
            <Label>City :     {addressInfo?.city}</Label>
            <Label>Pincode :  {addressInfo?.pincode}</Label>
            <Label>Phone :    {addressInfo?.phone}</Label>
            <Label>Notes :    {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="flex justify-between ">
          <Button onClick={()=>handleEditAddress(addressInfo)} className='px-4 py-1 border hover:bg-slate-500 '>Edit </Button>
          <Button onClick={()=>handleDeleteAddress(addressInfo)} className='px-4 py-1 border hover:bg-slate-500 '>Delete </Button>
        </CardFooter>
    </Card>
  )
}
