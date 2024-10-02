import { logOutUser } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AdminHeader({setopen}) {
  const dispatch = useDispatch()
  const handlelogout =()=>{
    dispatch(logOutUser())
  }

  return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={()=>setopen(true)} className="lg:hidden sm:block text-sm font-medium shadow p-2 rounded-full hover:bg-slate-700 bg-slate-600 text-white">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button className=" inline-flex gap-2 items-center rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-slate-700 bg-slate-600 text-white">
          <LogOut onClick={handlelogout}/>
          Logout
        </button>
      </div>
  </header>
}
