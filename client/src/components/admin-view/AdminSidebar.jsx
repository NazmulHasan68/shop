
import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, PartyPopper, ShoppingBasket } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";



const adminSidebarMenuItems = [
  {
      id: 'dashboard',
      label : 'Dashboard',
      path : '/admin/dashboard',
      icons : <LayoutDashboard/>
  },
  {
      id: 'product',
      label : 'Product',
      path : '/admin/product',
      icons : <ShoppingBasket />
  },
  {
      id: 'order',
      label : 'Order',
      path : '/admin/order',
      icons : <BadgeCheck />
  },
  {
      id: 'feature',
      label : 'Feature',
      path : '/admin/feature',
      icons : <PartyPopper />
  }
]


// eslint-disable-next-line react/prop-types
function MenuItems({setopen}){
  const navigate = useNavigate()
  return <nav className="mt-8 flex flex-col gap-2">
            {
              adminSidebarMenuItems.map((menuItem, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    navigate(menuItem.path);
                    if (setopen) setopen(false);  // Ensure setopen is called only when needed
                  }}
                  className="flex items-center gap-4 rounded-md px-3 py-2 cursor-pointer text-slate-800 hover:bg-slate-200 hover:font-semibold transition-all"
                >
                  {menuItem.icons}
                  <span>{menuItem.label}</span>
                </div>
              ))
            }
         </nav>
}

export default function AdminSidebar({open,setopen}) {
    const navigate = useNavigate()
    return (
      <div>
        <Sheet open={open} onOpenChange={setopen}>
            <SheetContent side="left" className="w-64 bg-white">
                <div className="flex flex-col h-full">
                    <SheetHeader className='border-b'>
                      <SheetTitle className='flex items-center gap-2 my-5'>
                        <ChartNoAxesCombined />
                        Admin Panel
                      </SheetTitle>
                    </SheetHeader>
                    <MenuItems setopen={setopen}/>
                </div>
            </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div onClick={()=>navigate('/admin/dashboard')} className="flex items-center cursor-pointer gap-2">
              <ChartNoAxesCombined />
              <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          <MenuItems/>
        </aside>
      </div>
    )
  }
  