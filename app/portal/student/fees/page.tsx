"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
const Fees = () => {

  const dueFees = [
    {
      id: 1,
      feeTitle: 'Tuition',
      amount: 55000,
      status: 'pay',
      session: '2022/2023',
      condition: 'Pending'
    },
    {
      id: 2,
      feeTitle: 'Practical',
      amount: 35000,
      status: 'paid',
      session: '2022/2023',
      condition: 'Successful'
    },
    {
      id: 3,
      feeTitle: 'Dues',
      amount: 10000,
      status: 'pay',
      session: '2022/2023',
      condition: 'Failed'
    },
  ]

  const [selectedTab, setSelectedTab] = useState('Payment History')
  return (
    <div>
      <div className="p-5 bg-slate-50">
        <div className="max-w-5xl mx-auto rounded-md">
          <div className="flex py-5">
            <div className="space-y-1">
              <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Fees</h1>
              <p>View your outstanding fees</p>
            </div>
            .
          </div>
          <hr />

          <div className="py-5">
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Due Fues</h1>
            <div className="">
              {dueFees.map((fees) => (
              <div key={fees.id} className="border-b p-3 flex justify-between items-center">
                <p>{fees.feeTitle}</p>
                <p>{fees.amount}</p>
                <button className={`rounded-md shadow-md px-10 py-2 text-base font-medium ${fees.status == 'paid' ? 'bg-gray-200' : 'bg-white'}`}>{fees.status}</button>
              </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-3">
                <p>Total</p>
                <p>100,000</p>
                <button className={`rounded-md shadow-md px-10 py-2 text-base bg-white font-medium`}>Pay</button>
            </div>
          </div>

              <Tabs className="my-3" value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                      <TabsList className="bg-[#F7F9FC]">
                        <TabsTrigger value="Payment History">Payment History</TabsTrigger>
                        <TabsTrigger value="Successful">Succesful</TabsTrigger>
                        <TabsTrigger value="Failed">Failed</TabsTrigger>
                      </TabsList>

                  <div className="flex items-center justify-around">
                    <div className="relative flex-1 bg-white">
                      <Search className="absolute left-2 top-2.5 h-4 w-4"/>
                      <Input placeholder="Search Courses" className="pl-8 bg-[#F7F9FC]"/>
                    </div>
                  </div>
                  </div>

                  <div className="rounded-md border my-5">
                    <Table>
                        <TableHeader className="bg-[#F7F9FC]">
                          <TableRow>
                          <TableHead className="w-12">
                          <Checkbox/>
                          </TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Session</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Condition</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody className="w-full">
                          {dueFees.map((fees)=> (
                            <TableRow key={fees.id} >
                               
                                  <TableCell>
                                    <Checkbox/>
                                  </TableCell>
                                  <TableCell>
                                    {fees.feeTitle}
                                  </TableCell>
                                  <TableCell>
                                    {fees.session}
                                  </TableCell>
                                  <TableCell>{fees.amount}</TableCell>
                                  <TableCell>
                                    <button className={`rounded-md p-2 ${fees.condition === 'Successful' ? 'bg-green-100 text-green-300' : fees.condition === 'Failed' ? 'bg-red-100 text-red-300' : fees.condition === 'Pending' ? 'bg-gray-100 text-gray-300' : ''}`}>{fees.condition}</button>
                                  </TableCell>
                                
                            </TableRow>
                          ))}
                        </TableBody>
                    </Table>
                  </div>
              </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Fees