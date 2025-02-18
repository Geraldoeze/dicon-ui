"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Plus, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"


const Departments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [department, setDepartment] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from the API
    Promise.all([
        fetch('https://dic.0ps.tech/api/department').then(response => response.json()),
    ])
    .then(([departmentData]) => {
        setDepartment(departmentData);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);
  return (
    <div className="bg-slate-50">
        <div className="bg-white max-w-[80vw] mx-auto px-10 py-5">
            <div className="flex items-center justify-between flex-col md:flex-row">
            <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10"> Departments <span className='text-[1.25rem] md:text-[1.5rem] font-medium'>{department?.length}</span>  </h1>

            <div className="flex items-center gap-x-2">
            <div className="relative flex-1 items-center">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]" />
            </div>
              {/* <Button className="bg-indigo-700 text-white hover:bg-indigo-800 flex items-center gap-2">
              <Plus className="h-4 w-4" />
               Add Assignment
              </Button> */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-800 hover:bg-indigo-900 text-white flex items-center gap-x-5">
             <Plus/>
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Department</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department_name">Enter Department Name</Label>
                <Input id="department_name" name="department_name" required />
              </div>
              <div className="space-y-4">
                <Label>Assign HOD</Label>
              <div>
              <select name="" id="" className="border-2 border-gray-100 py-2 w-full">
                <option value="">Prof Jayelo</option>
                <option value=""></option>
              </select>
              </div>
              </div>

              <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white">
                Schedule Class
              </Button>
            </form>
          </DialogContent>
        </Dialog>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {department?.map((dept) => (
                            <Card key={dept.id} className='py-4 px-2'>
                                    <CardContent className='space-y-3'>
                                     <p className='h-20 min-h-fit text-indigo-900 text-[1rem] md:text-[1.25rem] font-semibold'> <GraduationCap width={30} height={30}/> {dept.name}</p>
                                     <div className='flex items-center justify-between'>
                                        <b>Students: </b>
                                        <span className='text-[1.25rem] md:text-[1.5rem] font-medium'>{dept.total_students}</span> 
                                    </div>
                                     <p className='flex items-center justify-between'><b>HOD:</b><span>Prof Jayelo</span></p>
                                    </CardContent>
                            </Card>
                            ))}
            </div>
        </div>
    </div>
  )
}

export default Departments