import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {

  const [openSidebar , setOpenSidebar] = useState(false)
  return (
    <div className="flex min-h-screen w-full">
          {/* admin sidebar */}
          <AdminSidebar open={openSidebar} setopen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
          {/* admin header */}
            <AdminHeader setopen={setOpenSidebar}/>
            <main className="flex flex-1 flex-col bg-slate-300 md:p-6">
              <Outlet/>
            </main>
        </div>
    </div>
  )
}
