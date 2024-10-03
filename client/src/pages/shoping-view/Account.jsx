import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import accImage from '../../assets/account/banner1.jpg'
import Address from '@/components/shopping-view/Address'
import ShopingOrder from '@/components/shopping-view/ShopingOrder'
export default function ShopingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
            width={'1600'}
            height={'400'}
            style={{aspectRatio : '1600/400', objectFit:'cover'}}
            src={accImage}
        />
      </div>
      <div className=' container mx-auto grid grid-cols-1 gap-8 py-8 '>
        <div className='flex flex-col rounded-lg border bg-background p-5 shadow-sm'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value='address' className='px-4 py-1 border ml-2'>Address</TabsTrigger>
              <TabsTrigger value='orders' className='px-4 py-1 border ml-2'>Orders </TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShopingOrder/>
            </TabsContent>
            <TabsContent value='address'>
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
