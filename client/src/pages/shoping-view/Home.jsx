import { Button } from '@/components/ui/button'
import banner1 from '../../assets/banner/banner1.jpg'
import banner2 from '../../assets/banner/banner2.jpg'
import banner3 from '../../assets/banner/banner3.jpg'
import banner4 from '../../assets/banner/banner4.jpg'
import banner5 from '../../assets/banner/banner5.jpg'
import banner6 from '../../assets/banner/banner6.jpg'

import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Factory, Shirt, ShirtIcon, ShoppingBag, Speaker, Squirrel, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilterProduct, fetchProductDetails } from '@/store/shop/productSlice'
import ShoppingProductTitle from '@/components/shopping-view/product-title'
import { useNavigate } from 'react-router-dom'
import { addtocart, fetchcartItem } from '@/store/shop/cartSlice/cartSlice'
import { toast } from '@/hooks/use-toast'
import ProductDetails from '@/components/shopping-view/ProductDetails'

const categoryWithIcon =[
  {id: 'men', label : 'Men', icon : ShirtIcon},
  {id : 'women', label : "Women", icon : CloudLightning},
  {id : "kids", label : "Kids", icon : BabyIcon},
  {id : "accessories", label : "Accessories", icon: WatchIcon},
  {id : "footware" , label : "Footware", icon: UmbrellaIcon},
]

const brandWithIcon = [
  {id: 'nike', label : "Nike", icon: Factory},
  {id: 'adidas', label : "Adidas", icon: Speaker},
  {id: "levi", label : "Levi", icon: WatchIcon},
  {id: "zera", label : "Zera", icon: ShoppingBag },
  {id : "h&m", label : "H&M", icon: Squirrel }
]

export default function ShopingHome() {
  const slides = [banner1, banner2, banner3, banner4, banner5, banner6]
  const dispatch = useDispatch()
  const {productlist , productDetails} = useSelector(state => state.ShopingProduct)
  const [currentSlide, setcurrentSlide] = useState(0)
  const navigate = useNavigate()
  const [openDetilsDialopg, setOpenDetailsDialog] = useState(false)

  useEffect(()=>{
    const timer = setInterval(() => {
      setcurrentSlide(prevSlide=>(prevSlide + 1) % slides.length)
    }, 5000);

    return ()=> clearInterval(timer)
  },[])

  useEffect(()=>{
    dispatch(fetchAllFilterProduct({filerParams:{}, sortParams: 'Price Low to Hight'}))
  },[dispatch])

  const handleNavigateToListingPage = (getcurrentItem, section) =>{
    sessionStorage.removeItem('filters')
    const currentFilter = {
      [section] : [getcurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }
  


  
  function handleGetProductDetails(getcurrentProductId){
    dispatch(fetchProductDetails(getcurrentProductId))
    console.log(getcurrentProductId);
    
  }
  const {user} = useSelector(state=>state.auth)
  const handleAddtocart=(getcurrentProductId)=>{
    
    dispatch(addtocart({userId:user?.id, productId:getcurrentProductId, quantity:1}))

    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchcartItem({userId:user?.id}))
        toast({
          title : "product is added to cart"
        })
      }
    })
  }

  useEffect(()=>{
    if(productDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])


      
  return (
    <div className="flex flex-col min-h-screen">
     <div className="relative w-full h-[400px] gap-2 overflow-hidden">
      {
        slides && slides.map((slide, index)=>(<img 
        src={slide} 
        key={index} 
        className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
        />))}

      <Button 
        onClick={()=>setcurrentSlide(prevSlide => (prevSlide -1 + slides.length) % slides.length)}
        variant='outline' size='icon'
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 shadow-md">
          <ChevronLeftIcon className='w-4 h-4'/>
      </Button>
      <Button onClick={()=>setcurrentSlide(prevSlide => (prevSlide + 1) % slides.length)} 
      variant='outline' size='icon' 
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 shadow-md">
          <ChevronRightIcon className='w-4 h-4'/>
      </Button>
     </div>
      <section className='py-8 bg-gray-50'>
          <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                {
                  categoryWithIcon && categoryWithIcon?.map((item, index) =>
                    <Card onClick={()=>handleNavigateToListingPage(item , 'category')} key={index} className="cursor-pointer  hover:shadow-lg transition-shadow">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <item.icon className='w-12 h-12 mb-4 text-primary'/>
                        <span className='font-bold'>{item.label}</span>
                      </CardContent>
                    </Card>
                  )
                }
              </div>
          </div>
      </section>
      <section className='py-6 bg-gray-50'>
          <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-8'>Shop by brand</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                {
                  brandWithIcon && brandWithIcon?.map((item, index) =>
                    <Card key={index} className="cursor-pointer  hover:shadow-lg transition-shadow">
                      <CardContent onClick={()=>handleNavigateToListingPage(item , 'brand')} className="flex flex-col items-center justify-center p-6">
                        <item.icon className='w-12 h-12 mb-4 text-primary'/>
                        <span className='font-bold'>{item.label}</span>
                      </CardContent>
                    </Card>
                  )
                }
              </div>
          </div>
      </section>

      <section className='py-12 '>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Product</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productlist?.data && productlist?.data?.length > 0 ? 
              productlist?.data?.map((productItem , index)=>
                <ShoppingProductTitle key={index} 
                      handleGetProductDetails={handleGetProductDetails}  
                      handleAddtocart={handleAddtocart}
                      product={productItem}/>) : null
            }
          </div>
        </div>
      </section>
      <ProductDetails open={openDetilsDialopg} setOpen={setOpenDetailsDialog} ProductDetails={productDetails}/>
    </div>
  )
}
