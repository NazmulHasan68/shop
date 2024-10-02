import Productfilter from "@/components/shopping-view/filter";
import ShoppingProductTitle from "@/components/shopping-view/product-title";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import { Button } from "@/components/ui/button";
import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { sortOption } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addtocart, fetchcartItem } from "@/store/shop/cartSlice/cartSlice";
import { fetchAllFilterProduct, fetchProductDetails } from "@/store/shop/productSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams){   //learn form here
    const queryParams = [];
    for(const [key, value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length > 0 ){
        const paramValue = value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }

    
    return queryParams.join('&')
}

export default function Shpoinglisting() {
  const disptach = useDispatch()
  const {productlist, productDetails} = useSelector(state => state.ShopingProduct)
  const [filters, setfilters] = useState({});
  const [sort, setsort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [openDetilsDialopg, setOpenDetailsDialog] = useState(false)
  const {toast} = useToast()
  


  useEffect(()=>{
    if(productDetails !== null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])

  const handleSort =(value)=>{
    setsort(value)
  }

  const handleFilter=(getSectionId, getCurrentOption)=>{
    let cpyFilters ={...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
    if(indexOfCurrentSection === -1){
      cpyFilters = {
        ...cpyFilters,
        [getSectionId] : [getCurrentOption],
      }
    }else{
      const indexofCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)
      if(indexofCurrentOption === -1){
        cpyFilters[getSectionId].push(getCurrentOption)
      }else{
        cpyFilters[getSectionId].splice(indexOfCurrentSection, 1)
      }
    }
    setfilters(cpyFilters)
    sessionStorage.setItem('filters',JSON.stringify(cpyFilters))
  }
  useEffect(()=>{
    setsort('price-lowtohigh')
    setfilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  useEffect(()=>{
      if(filters && Object.keys(filters).length > 0 ){
        const createQueryString = createSearchParamsHelper(filters)
        setSearchParams(new URLSearchParams(createQueryString))
      }
  },[filters])

  useEffect(()=>{
    if(filters !== null && sort !== null)
    disptach(fetchAllFilterProduct({filerParams:filters, sortParams:sort}))
  },[disptach, sort, filters])


  function handleGetProductDetails(getcurrentProductId){
    disptach(fetchProductDetails(getcurrentProductId))
  }


  const {user} = useSelector(state=>state.auth)
  const handleAddtocart=(getcurrentProductId)=>{
    
    disptach(addtocart({userId:user?.id, productId:getcurrentProductId, quantity:1}))

    .then((data)=>{
      if(data?.payload?.success){
        disptach(fetchcartItem({userId:user?.id}))
        toast({
          title : "product is added to cart"
        })
      }
    })
  }

  


  return<div className="grid grid-col-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <Productfilter handleFilter={handleFilter} filters={filters}/>
        <div className="bg-slate-100 w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg text-slate-700 font-semibold"> All Product </h2>
            <div className="flex items-center gap-2 ">
              <span className=" text-slate-400 mr-4">{productlist?.data?.length} Products</span>
              <DropdownMenu className=''>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-slate-200">
                    <ArrowUpDown className="h-4 w-4"/>
                    <span>Sort by </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] bg-white p-2 shadow-sm mt-2 z-40">
                  <DropdownMenuGroup value={sort} >
                    {
                      sortOption?.map((sortOption)=>(
                        <DropdownMenuRadioItem 
                         onClick={()=>handleSort(sortOption.id)}
                          value={sortOption.id} 
                          key={sortOption.id} 
                          className='hover:bg-slate-100 cursor-pointer font-semibold text-slate-600'>
                          {sortOption.label}
                        </DropdownMenuRadioItem>))
                    }
                  </DropdownMenuGroup>
                </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 overflow-y-auto h-[450px]">
              {
                productlist?.data?.map((productlist, index) => 
                <ShoppingProductTitle
                       handleGetProductDetails={handleGetProductDetails} 
                       key={index} 
                       product={productlist}
                       handleAddtocart={handleAddtocart}
                />) 
              }
          </div>
        </div>
        <ProductDetails open={openDetilsDialopg} setOpen={setOpenDetailsDialog} ProductDetails={productDetails}/>
  </div>
}
