
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shopingViewHeaderMenuItem } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { logOutUser } from "@/store/auth-slice";
import CartWrapper from "./CartWrapper";
import { useEffect, useState } from "react";
import { fetchcartItem } from "@/store/shop/cartSlice/cartSlice";
import { Label } from "../ui/label";


function MenuItems (){
  const navigate = useNavigate()
  const handlenavigate = (getcurrentMenuItem) =>{
      sessionStorage.removeItem('filters')
      const currentFilter = getcurrentMenuItem.id !== 'home' ? 
      { category : [getcurrentMenuItem.id] } : null

      sessionStorage.setItem('filters', JSON.stringify(currentFilter))
      navigate(getcurrentMenuItem.path)
  }
  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shopingViewHeaderMenuItem.map((MenuItems, index)=>
        <Label onClick={()=>handlenavigate(MenuItems)}
              className="text-sm font-medium cursor-pointer" 
              key={index}
        >{MenuItems.label}</Label>)
    }
  </nav>
}


function HeaderRightContent(){
  const {user} = useSelector(state=>state.auth)
  const {cartItems} =useSelector(state=>state.ShopingCart)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [openCartSheet, setOpenCartSheet] = useState(false)

  const handlelogOut =()=>{
    dispatch(logOutUser())
  }

  useEffect(()=>{
      dispatch(fetchcartItem({userId:user?.id}))
  },[dispatch])


  return<div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
        <Button onClick={()=>setOpenCartSheet(true)} variant='outline' size='icon'>       
            <ShoppingCart className="h-6 w-6"/>
            <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper 
            setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems &&cartItems.items && cartItems.items.length > 0 
            ? cartItems.items
            :  []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Avatar className='bg-black'>
              <AvatarFallback className='bg-black text-white font-extrabold'>
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' className='w-56 bg-white p-2'>
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=>navigate('/shop/account')} className='hover:bg-slate-200 cursor-pointer'>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
          <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=>handlelogOut()} className='hover:bg-slate-200 cursor-pointer'>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>
}

export default function ShopingHeader() {


  const {isAuthentication, isLoading, user} = useSelector(state=>state.auth)


  return<header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
            <Link to='/shop/home' className="flex items-center gap-2">
                <HousePlug  className="h-6 w-6"/>
                <span className="font-bold">Ecommerce</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle header menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className="w-full max-w-xs bg-white">
                    <MenuItems/>
                    <HeaderRightContent/>
              </SheetContent>
            </Sheet>
            <div className="hidden lg:block">
                <MenuItems/>
            </div>
            <div className="hidden lg:block">
              <HeaderRightContent/>
            </div>
        </div>
  </header>
}
