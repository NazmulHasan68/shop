import CommonForm from "@/components/common/form"
import { LoginFormControler } from "@/config";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email : '',
  password : ''
}

export default function AuthLogin() {
  const[FormData, setFormData] = useState(initialState)
  const dispatch = useDispatch()

  const onSubmit =(event)=>{
      event.preventDefault()
      dispatch(loginUser(FormData)).then((data)=>{
        if(data?.payload?.success){
          toast({
            title : data?.payload?.message
          })
        }else{
          toast({
            title : data?.payload?.message,
            varieant : "destructive"
          })
        }
        
      })
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-x-6">
      <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in account</h1>
          <p className="mt-2 ml-2">Don't have an account <Link className="font-medium text-primary hover:underline" to='/auth/register'> Sign in</Link></p>
      </div>
      <CommonForm
         formControls={LoginFormControler}
         buttonText={'Sign In'}
         FormData={FormData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
)}
