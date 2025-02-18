import React from 'react';
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
import { Book, Clock, GraduationCap, Search, Filter, Loader2, ArrowRight, RotateCw } from "lucide-react";
import FilterMenu from '@/components/ui/FilterMenu';

// Types
interface Filter {
  column: string;
  value: string;
}

interface FilterOption {
  column: string;
  label: string;
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
      <Icon className="h-6 w-6 text-muted-foreground" />
      <CardTitle className="text-[1rem] md:text-[1.2rem] font-medium">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className='space-y-6'>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className="text-[1.2rem] md:text-[1.75rem] text-black font-bold">{value}</div>
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
const ActionButton = ({ status, onAction, isLoading }: ActionButtonProps) => {
  if (isLoading) {
    return (
      <Button variant="ghost" disabled>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Processing...
      </Button>
    );
  }

  switch (status) {
    case 'registered':
      return (
        <Button 
          variant="ghost" 
          className="text-primary hover:text-primary/80"
          onClick={onAction}
        >
          View details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    case 'unregistered':
      return (
        <Button 
          variant="secondary"
          className="text-gray-600 hover:text-gray-700"
          onClick={onAction}
        >
          Register
        </Button>
      );
    case 'carryover':
      return (
        <Button 
          variant="secondary"
          className="text-red-600 hover:text-red-700"
          onClick={onAction}
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Retake
        </Button>
      );
  }
};

export { StatsCard, CourseFilters, ActionButton, type Filter };