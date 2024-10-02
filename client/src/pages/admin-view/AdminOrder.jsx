import AminOdersDetails from "@/components/admin-view/AminOdersDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";


export default function AdminOrder() {

  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  return (
    <Card>
    <CardHeader>
      Admin History
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
                <AminOdersDetails/>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
   </Card>
  )
}
