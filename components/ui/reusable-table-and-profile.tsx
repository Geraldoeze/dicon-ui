import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Filter, Search, Download, Mail, Phone, Cake, GraduationCap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Types
type BaseProfile = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  course?: string;
  academicProgram?: string;
  profileImage?: string;
};

type StudentProfile = BaseProfile & {
  nin: {
    url: string;
    uploadDate: string;
    size: string;
  };
  passport: {
    url: string;
    uploadDate: string;
    size: string;
  };
};

type ApplicationProfile = StudentProfile & {
  status: 'pending' | 'approved' | 'rejected';
};

type StaffProfile = BaseProfile & {
  department: string;
  role: string;
};

type TableColumn = {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
};

// Props types
type DataTableProps = {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  showCheckbox?: boolean;
  actions?: React.ReactNode;
};

type ProfileViewProps = {
  data: BaseProfile | StudentProfile | ApplicationProfile | StaffProfile;
  type: 'student' | 'staff' | 'application';
  onApprove?: () => void;
  onReject?: () => void;
};

// Reusable Table Component
export const DataTable = ({ columns, data, onRowClick, showCheckbox = false, actions }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        {actions}
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {showCheckbox && <th className="w-10 py-4" />}
              {columns.map((column) => (
                <th key={column.key} className="text-left py-4 font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50 cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {showCheckbox && (
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, row.id]);
                        } else {
                          setSelectedRows(selectedRows.filter(id => id !== row.id));
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="py-4">
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
export const ProfileView = ({ data, type, onApprove, onReject }: ProfileViewProps) => {
  return (
    <Card className="max-w-2xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={data.profileImage} />
          <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{data.name}</h2>
          {data.course && <p className="text-gray-500">{data.course}</p>}
          {data.academicProgram && (
            <p className="text-gray-500">{data.academicProgram}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>{data.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cake className="w-5 h-5 text-gray-400" />
            <span>{data.dateOfBirth}</span>
          </div>
          {(data as StaffProfile).department && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-gray-400" />
              <span>{(data as StaffProfile).department}</span>
            </div>
          )}
        </div>

        {(type === 'student' || type === 'application') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documents</h3>
            {['nin', 'passport'].map((doc) => {
              const document = (data as StudentProfile)[doc as keyof StudentProfile] as any;
              return (
                <div key={doc} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{doc}</p>
                    <p className="text-sm text-gray-500">
                      {document.uploadDate} • {document.size}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {type === 'application' && (
          <div className="flex gap-4 mt-6">
            <Button onClick={onApprove} className="w-full">
              Approve
            </Button>
            <Button onClick={onReject} variant="destructive" className="w-full">
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Example usage with config
export const tableConfig = {
  students: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'course', header: 'Course' },
      { key: 'email', header: 'Email' },
      {
        key: 'details',
        header: 'Details',
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
      { key: 'name', header: 'Name' },
      { key: 'course', header: 'Course' },
      { key: 'email', header: 'Email' },
      {
        key: 'status',
        header: 'Status',
        render: (value: string) => (
          <span className={`px-3 py-1 rounded-full text-sm ${
            value === 'approved' ? 'bg-green-100 text-green-800' :
            value === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        ),
      },
      {
        key: 'details',
        header: 'Details',
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
      { key: 'name', header: 'Name' },
      { key: 'department', header: 'Department' },
      { key: 'email', header: 'Email' },
      {
        key: 'details',
        header: 'Details',
        render: () => (
          <Button variant="link" className="text-blue-600">
            View details →
          </Button>
        ),
      },
    ],
  },
};