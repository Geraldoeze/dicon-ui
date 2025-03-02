"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Plus, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useMutation, useQuery } from "@tanstack/react-query"
import { adminService } from "@/services/admin.service"
import Image from "next/image"

interface createDepartmentForm {
    name: string;
    head_of_department_id: number;
    description: string;
}
const Departments = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [department, setDepartment] = useState<any[]>([]);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  const { data: staffs }= useQuery({
    queryKey: ['staffs'], 
    queryFn: () => adminService.getStaffs()});

  const createDepartment = useMutation({
    mutationFn: (data: createDepartmentForm) => 
      adminService.createDepartment(data),
    onSuccess: () => {
      setIsDialogOpen(false);
      setIsSuccessDialogOpen(true)
    }
  })

   const handleCreateDepartment = (formData: createDepartmentForm) => {
    createDepartment.mutate(formData);
  };
  useEffect(() => {
    // Fetch data from the API
    Promise.all([
        fetch('https://dic.0ps.tech/api/departments').then(response => response.json()),
    ])
    .then(([departmentData]) => {
        setDepartment(departmentData.data);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);
  return (
    <div className="bg-slate-50">
        <div className="bg-white max-w-[80vw] mx-auto px-10 py-5">
            <div className="flex items-center justify-between">
            <h1 className="text-[1.5rem] text-center md:text-[2.5rem] font-semibold my-10 flex items-center gap-x-5"> Departments <span className='text-[1.25rem] md:text-[1.5rem] font-medium bg-gray-100 p-1 rounded-full'>{department?.length}</span> </h1>

            <div className="flex items-center flex-col md:flex-row gap-5 my-5">
            <div className="relative flex-1 items-center">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search departments..." className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]" />
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
              const formData = new FormData(e.currentTarget);
              // const headOfDepartmentId = formData.get('head_of_department_id');
              // if (typeof headOfDepartmentId === 'number') {
              // handleCreateDepartment({
              // name: formData.get('name') as string,
              // head_of_department_id: headOfDepartmentId,
              // description: formData.get('description') as string
              // });
              // } else {
              // console.error('Invalid value for head_of_department_id');
              // }
              handleCreateDepartment({
                name: formData.get('name') as string,
                head_of_department_id: formData.get('head_of_department_id') as number,
                description: formData.get('description') as string
              })
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Enter Department Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-4">
                <Label>Assign HOD</Label>
                
              <select className="border-2 border-gray-100  py-2 w-full">
              <option value="">Select a Lecturer</option>
              {staffs?.data.map((lecturer)=>(
                <option id="head_of_department_id" name="head_of_department_id" key={lecturer.id} value={lecturer.id}>{lecturer.first_name + " " + lecturer.last_name}</option>
              ))}
              </select>
                
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Enter description</Label>
                <textarea cols={5} rows={5} id="description" name="description" required className="border-2 border-gray-100 py-2 w-full"></textarea>
              </div>

              <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white">
                Add Department
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
         
          <DialogContent>
          <DialogHeader>
          <Image src='/icon.svg' alt="upload" width={50} height={50}/>
          </DialogHeader>
              <DialogTitle>Succesful! The new department has been created</DialogTitle>
          </DialogContent>
        </Dialog>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2 w-full">
                            {department?.map((dept) => (
                            <Card key={dept.id} className='py-4 px-2'>
                                    <CardContent className='space-y-3'>
                                     <a href={`/portal/admin/departments/${dept.id}`}>
                                     <h1 className='h-20 min-h-fit text-indigo-900 text-[1rem] md:text-[1.25rem] font-semibold'> <GraduationCap width={30} height={30}/> {dept.name}</h1></a>
                                     <div className='flex items-center justify-between'>
                                        <b>Students: </b>
                                        <span className='text-[1.25rem] md:text-[1.5rem] font-medium'>{dept.total_students}</span> 
                                    </div>
                                     <p className='flex items-center justify-start md:justify-between flex-col lg:flex-row'><b>HOD:</b><span>{dept.head_of_department}</span></p>
                                    </CardContent>
                            </Card>
                            ))}
            </div>
        </div>
    </div>
  )
}

export default Departments