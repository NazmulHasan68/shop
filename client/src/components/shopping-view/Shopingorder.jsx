import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import OrderDetails from "./OrderDetails";

export default function ShopingOrder() {
  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  return (
   <Card className='mt-3'>
    <CardHeader>
      Order History
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className='bg-slate-200'>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Data</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1232334</TableCell>
            <TableCell>12/02/2012</TableCell>
            <TableCell>Inproces</TableCell>
            <TableCell>$1200</TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setopenDetailsDialog}>
                <Button onClick={()=>setopenDetailsDialog(true)} className='bg-slate-800 hover:bg-slate-900 text-white'>View Details</Button>
                <OrderDetails/>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
   </Card>
  )
}
