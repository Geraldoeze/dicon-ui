import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Filter,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Download,
  User,
} from "lucide-react";
import Link from "next/link";

// Types for different data structures
interface Student {
  student_id: number;
  photo_url: string;
  full_name: string;
  next_of_kin: string | null;
  state: string;
  local_government: string;
  gender: string;
  department: string;
  head_of_department_id: number;
  degree: string;
  department_created_on: string;
  program: string;
  program_start: string;
  program_end: string;
  address: string;
  phone_number: string;
  email: string;
}

interface Staff {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  gender: string;
  state: string;
  local_government: string;
  created_at: string;
  department: string;
}

interface Application {
  id: number;
  first_name: string;
  last_name: string;
  photo_url: string;
  program: string;
  degree: string;
  gender: string;
  date_of_birth: string;
  department: string;
  phone_number: string;
  email: string;
  status: string;
  application_date: string;
  program_id: number;
  application_form_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: number;
  course_id: number;
  course_name: string;
  course_code: string;
  units: number;
  total_videos: number;
  total_students: number;
  lecturer_in_charge: string;
}

type TableColumn = {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
};

type DataTableProps = {
  columns: TableColumn[];
  data: (Student | Staff | Application | Course)[];
  onRowClick?: (row: any) => void;
  type: "student" | "staff" | "application" | "course";
  actions?: React.ReactNode;
};

type ProfileViewProps = {
  data: Student | Staff | Application;
  type: "student" | "staff" | "application";
  onApprove?: () => void;
  onReject?: () => void;
  onRemove?: () => void;
};

// Type guards
const isStudent = (data: any): data is Student => "student_id" in data;
const isStaff = (data: any): data is Staff =>
  "first_name" in data && "last_name" in data;
const isApplication = (data: any): data is Application =>
  "status" in data && "application_date" in data;
const isCourse = (data: any): data is Course => "course_id" in data;

// Helper function to get the display name
const getDisplayName = (data: Student | Staff | Application): string => {
  if (isStudent(data)) return data.full_name;
  if (isStaff(data)) return data.full_name;
  if (isApplication(data)) return `${data.first_name} ${data.last_name}`;
  return data.name;
};

// Helper function to get the ID
// const getId = (data: Student | Staff | Application): number => {
//   if (isStudent(data)) return data.student_id;
//   return data.id;
// };

const getId = (data: Student | Staff | Application | Course | any): number => {
  if (isStudent(data)) return data.student_id;
  if (isCourse(data)) return data.id;
  return data.id;
};

// Reusable Table Component
export const DataTable = ({
  columns,
  data,
  onRowClick,
  type,
  actions,
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-[70vw] mx-auto">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-2xl font-semibold">
          {type === "student" && "Students"}
          {type === "staff" && "Staffs"}
          {type === "application" && "Student Applications"}
          {type === "course" && "Courses"}
        </h1>
        <div className="flex gap-4 my-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          {actions} */}
        </div>
      </div>

      <div className="overflow-x-auto my-5">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="border-b bg-slate-50">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-4 px-4 font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-slate-50 cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-4 px-4">
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reusable Profile View Component
export const ProfileView = ({
  data,
  type,
  onApprove,
  onReject,
  onRemove,
}: ProfileViewProps) => {
  return (
    <Card className="md:max-w-[80vw] mx-auto md:p-7 py-5">
      <div className="flex justify-center flex-col">
      <CardContent className="flex-1 flex sm:flex-row items-start gap-4">
        {/* <Avatar className="w-16 h-16">
          <AvatarImage src={isStudent(data) ? data.photo_url : isApplication(data) ? data.photo_url : undefined} />
          <AvatarFallback>{'A'}</AvatarFallback>
        </Avatar> */}
        <div className="flex-1 items-center">
          <h2 className="text-2xl font-semibold">{getDisplayName(data)}</h2>
          {(isApplication(data)) || type === 'application' && (
            <div className="flex items-center">
            <h1 className='text-base sm:text-lg md:text-2xl lg:text-3xl font-bold'>{data.first_name} {data.last_name}</h1>
            </div>
          )}
          {(isStudent(data)) && (
            <p className="text-gray-500">{data.program}</p>
          )}
          {isStaff(data) || type === 'staff' && (
            <div className="">
            <h1 className='text-base sm:text-lg md:text-2xl lg:text-3xl font-bold'>{data.full_name}</h1>
            {/* <p className="text-gray-500">{data.department}</p> */}
            </div>
          )}
        
        </div>
      </CardContent>
      <CardContent className="flex-1 space-y-6">
        
        <div className="space-y-4">
          <div className='space-y-3'>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>Email</span>
          </div>
          <h1 className='text-base md:text-lg font-semibold'>{data.email}</h1>
          <hr />
          </div>
          <div className='space-y-3'>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>Phone Number</span>
          </div>
          <h1 className='text-base md:text-lg font-semibold'>{data.phone_number}</h1>
          <hr />
          </div>
          {isStudent(data) && (
            <>
              {/* <div className='space-y-3'>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>Email</span>
              </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.address}</h1>
               <hr />
              </div> */}
              <div className='space-y-3'>
               <div className="flex items-center gap-2">
               <GraduationCap className="w-5 h-5 text-gray-400" />
               <span>Department</span>
               </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.department}</h1>
               <hr />
               </div>
               <div className='space-y-3'>
               <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <span>Degree</span>
               </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.degree}</h1>
               <hr />
               </div>
            </>
          )}

{isStaff(data) || type === 'staff' && (
            <>
              {/* <div className='space-y-3'>
              <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
               <span>Address</span>
              </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.address}</h1>
               <hr />
              </div> */}
              {/* <div className='space-y-3'>
               <div className="flex items-center gap-2">
               <GraduationCap className="w-5 h-5 text-gray-400" />
               <span>Local Government</span>
               </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.local_government}</h1>
               <hr />
               </div> */}
               <div className='space-y-3'>
               {/* <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <span>State</span>
               </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.state}</h1>
                */}
               <hr />
               <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <span>Gender</span>
               </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.gender}</h1>
               <hr />
               <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gray-400" />
                <span>Phone Number</span>
               </div>
               <h1 className='text-base md:text-lg font-semibold'>{data.phone_number}</h1>
               <hr />
               </div>
            </>
          )}
          {isApplication(data) || type === 'application' && (
              <>
              {/* 
              <div className='space-y-3'>
              <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <span>Date of Birth</span>
              </div>
              <h1 className='text-base md:text-lg font-semibold'>{data.date_of_birth}</h1>
              <hr />
              </div>
               <div className='space-y-3'>
              <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              <span>Description</span>
              </div>
              <h1 className='text-base md:text-lg font-semibold'>{data.description}</h1>
              <hr />
              </div> */}
              <div className='space-y-3'>
              <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-gray-400" />
              <span>Course</span>
              </div>
              <h1 className='text-base md:text-lg font-semibold'>{data.department}</h1>
              <hr />
              </div>
              <div className='space-y-3'>
              <div className="flex items-center gap-2">
               <GraduationCap className="w-5 h-5 text-gray-400" />
               <span>Degree</span>
              </div>
              <h1 className='text-base md:text-lg font-semibold'>{data.degree}</h1>
              <hr />
              </div>
            {/* <div className="flex items-center flex-col md:flex-row gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>Applied on: {data.created_at}</span>
            </div> */}
            </>
          )}
        </div>

        {/* {(isStudent(data) || isStaff(data)) && type !== 'application' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-base font-medium text-gray-500">State</p>
              <p>{data.state}</p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-500">Local Government</p>
              <p>{data.local_government}</p>
            </div> 
            </div>
          </div>
        )} */}

          {isApplication(data) ||
            (type === "application" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documents</h3>
                {["Application Form.pdf", "Passport"].map((doc) => (
                  <div
                    key={doc}
                    className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-center md:text-start">
                        {doc}
                      </p>
                      {/* <p className="text-sm text-gray-500">11 Sep, 2023 • 13MB</p> */}
                    </div>
                    <Button variant="ghost" size="sm">
                      {doc === "Application Form.pdf" ? (
                        <Link
                          href={data.application_form_url}
                          target="_blank"
                          className="flex items-center space-x-2"
                        >
                          <span>Download</span>
                          <Download className="w-4 h-4" />
                        </Link>
                      ) : (
                        <Link
                          href={data.photo_url}
                          target="_blank"
                          className="flex items-center space-x-2"
                        >
                          <span>View</span>
                          <Download className="w-4 h-4" />
                        </Link>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            ))}

          {type === "application" && (
            <div className="flex items-center flex-col lg:flex-row gap-2">
              <Button
                onClick={onReject}
                variant="outline"
                className="text-indigo-600 bg-transparent"
              >
                Reject Application
              </Button>
              <Button onClick={onApprove} className="bg-indigo-600 text-white">
                Approve Application
              </Button>
            </div>
          )}
          {type === "staff" && onRemove && (
            <Button onClick={onRemove} variant="destructive">
              Remove staff
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

// Table configurations
export const tableConfig = {
  students: {
    columns: [
      {
        key: "full_name",
        header: "Name",
        render: (value: string, row: Student) => (
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={row.photo_url} />
              <AvatarFallback>{value.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{value}</span>
          </div>
        ),
      },
      { key: "program", header: "Program" },
      { key: "email", header: "Email" },
      {
        key: "details",
        header: "Details",
        render: () => (
          <Button variant="link" className="text-blue-600">
            View details →
          </Button>
        ),
      },
    ],
  },
  staff: {
    columns: [
      {
        key: "name",
        header: "Name",
        render: (_, row: Staff) => (
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{`${row.first_name[0]}${row.last_name[0]}`}</AvatarFallback>
            </Avatar>
            <span>{`${row.first_name} ${row.last_name}`}</span>
          </div>
        ),
      },
      { key: "department", header: "Department" },
      { key: "email", header: "Email" },
      {
        key: "details",
        header: "Details",
        render: () => (
          <Button variant="link" className="text-blue-600">
            View details →
          </Button>
        ),
      },
    ],
  },
  applications: {
    columns: [
      {
        key: "name",
        header: "Name",
        render: (value: string) => (
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{value.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{value}</span>
          </div>
        ),
      },
      { key: "program", header: "Program" },
      { key: "email", header: "Email" },
      {
        key: "status",
        header: "Status",
        render: (value: string) => (
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              value.toLowerCase() === "approved"
                ? "bg-green-100 text-green-800"
                : value.toLowerCase() === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        key: "details",
        header: "Details",
        render: () => (
          <Button variant="link" className="text-gray-900">
            View details →
          </Button>
        ),
      },
    ],
  },
};
