import React , { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuCheckboxItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Filter,
  //  Loader2, ArrowRight, RotateCw, Check, AlertCircle
   } from "lucide-react";
import FilterMenu from '@/components/ui/FilterMenu';

// Types
interface Filter {
  column: string;
  value: string;
}

interface FilterOption {
  column: string;
  label: string;
  group: string;
}

const courseFilterOptions: FilterOption[] = [
  { column: 'course_name', label: 'Course Name', group: 'Course Details' },
  { column: 'course_code', label: 'Course Code', group: 'Course Details' },
  { column: 'units', label: 'Course Units', group: 'Course Details' },
  { column: 'lecturer_in_charge', label: 'Lecturer', group: 'Course Details' }
];

// Stats Card Component
const StatsCard = ({ title, value, description, icon: Icon, className }: any) => (
  <Card className={`border-[1px] md:border-e-0 shadow-none md:border-y-0 rounded-none ${className}`}>
    <CardHeader className="flex flex-row md:items-center gap-x-2 space-y-0 pb-2">
      <Icon className= {`h-6 w-6`}  />
      <CardTitle className="text-[1rem] md:text-[1.2rem] font-medium">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className='space-y-6'>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className="text-[1.2rem] md:text-[1.75rem] text-black font-medium">{value}</div>
    </CardContent>
  </Card>
);
const CourseFilters = ({ 
  activeFilters,
  onFilterChange,
  onSearchChange,
  searchQuery 
}: {
  activeFilters: FilterValue[];
  onFilterChange: (filters: FilterValue[]) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}) => (
  <FilterMenu
    options={courseFilterOptions}
    activeFilters={activeFilters}
    onFilterChange={onFilterChange}
    searchQuery={searchQuery}
    onSearchChange={onSearchChange}
    searchPlaceholder="Search courses..."
  />
);

// Action Button Component

interface ActionButtonProps {
  status: 'registered' | 'unregistered' | 'carryover';
  onAction: () => Promise<void>;
  courseId: string;
  loadingCourseId?: string | null;
  disabled?: boolean;
}


const ActionButton = ({ 
  status, 
  onAction, 
  courseId, 
  loadingCourseId,
  disabled = false 
}: ActionButtonProps) => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const isLoading = loadingCourseId === courseId;
  const handleAction = async () => {
    if (status === 'registered') {
      // Route to details page for registered courses
      router.push(`/portal/student/courses/${courseId}`);
      return;
    }

    try {
      await onAction();
      // Show success modal for register and retake actions
      if (status === 'carryover') {
        setSuccessMessage('You have successfully registered to retake this course.');
      } else {
        setSuccessMessage('You have successfully registered for this course.');
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  const buttonConfig = {
    registered: {
      variant: "ghost" as const,
      className: "text-primary hover:text-primary/80",
      label: "View details"
    },
    unregistered: {
      variant: "secondary" as const,
      className: "text-gray-600 hover:text-gray-700",
      label: "Register"
    },
    carryover: {
      variant: "secondary" as const,
      className: "text-red-600 hover:text-red-700",
      label: "Retake"
    }
  };

  const config = buttonConfig[status];

  return (
    <>
      <Button
        variant={config.variant}
        className={config.className}
        onClick={handleAction}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          <>
            {config.label}
          </>
        )}
      </Button>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {status === 'unregistered' ? 'Registration Successful' : 'Retake Registration Successful'}
            </DialogTitle>
            <DialogDescription>
            {successMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { StatsCard, CourseFilters, ActionButton, type Filter };