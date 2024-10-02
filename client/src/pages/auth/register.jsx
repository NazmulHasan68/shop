import CommonForm from "@/components/common/form";
import { resgisterFormControler } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
  userName : '',
  email : '',
  password : ''
}

export default function AuthRegister() {
  const[FormData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()


  const onSubmit =(event)=>{
    event.preventDefault()
    dispatch(registerUser(FormData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message,
        })
        navigate('/auth/login')
      }else{
        toast({
          title : data?.payload?.message,
          variant: "destructive",
        })
      }
    })
  }
  
  return (
    <div className="mx-auto w-full max-w-md space-x-6">
      <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
          <p className="mt-2 ml-2">Already have and account <Link className="font-medium text-primary hover:underline" to='/auth/login'> Login</Link></p>
      </div>
      <CommonForm
         formControls={resgisterFormControler}
         buttonText={'Sign Up'}
         FormData = {FormData}
         setFormData={setFormData}
         onSubmit={onSubmit}
      />
    </div>
  )
}
