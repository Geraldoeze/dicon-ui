import React from 'react';
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuSub
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { FilterOption, FilterValue } from '@/services/types';
import { CustomFilter } from '@/proto/filter';



interface FilterMenuProps {
  options: FilterOption[];
  activeFilters: FilterValue[];
  onFilterChange: (filter: Partial<CustomFilter>) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  selectedTab: string;
  currentFilters: CustomFilter;
}



const FilterMenu: React.FC<FilterMenuProps> = ({
  // options,
  currentFilters = {},
  onFilterChange,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search..."
}) => {


  // const sessions = ['2023/2024', '2022/2023', '2021/2022'];
  // const units = ['2', '3', '4'];

  // const handleFilterSelect = (type: string, value: string) => {
  //   const filterUpdate: Partial<CustomFilter> = {
  //     page: 1, // Reset to first page on filter change
  //   };

  //   switch (type) {
  //     case 'course_type':
  //       filterUpdate.course_type = value;
  //       break;
  //     case 'session':
  //       filterUpdate.session = value;
  //       break;
  //     case 'unit':
  //       filterUpdate.unit = value;
  //       break;
  //   }

  //   onFilterChange(filterUpdate);
  // };

  // const applyFilter = (type: 'session' | 'unit', value: string) => {
  //   onFilterChange({
  //     [type]: value,
  //     page: 1,
  //     page_size: 5,
  //     student_id: '1', // Ensure student_id is always sent
  //     course_type: currentFilters.course_type // Maintain current course_type
  //   });
  // };
  // const groupedOptions = options.reduce((acc, option) => {
  //   const group = option.group || 'default';
  //   if (!acc[group]) {
  //     acc[group] = [];
  //   }
  //   acc[group].push(option);
  //   return acc;
  // }, {} as Record<string, FilterOption[]>);

  // const handleFilterToggle = (column: string) => {
  //   const isActive = activeFilters.some(f => f.column === column);
  //   const newFilters = isActive
  //     ? activeFilters.filter(f => f.column !== column)
  //     : [...activeFilters, { column, value: '' }];
  //   onFilterChange(newFilters);
  // };

  return (
    <div className="flex items-center justify-around flex-col sm:flex-row gap-4">
      <div className="relative flex-1 items-center">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter Dropdown */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter Courses</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* Session Filter 
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Session</span>
              {currentFilters.session && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {currentFilters.session}
                </span>
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {sessions.map((session) => (
                <DropdownMenuItem
                  key={session}
                  onClick={() => applyFilter('session', session)}
                  className={currentFilters.session === session ? 'bg-accent' : ''}
                >
                  {session}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Unit Filter 
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Units</span>
              {currentFilters.unit && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {currentFilters.unit} Units
                </span>
              )}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {units.map((unit) => (
                <DropdownMenuItem
                  key={unit}
                  onClick={() => applyFilter('unit', unit)}
                  className={currentFilters.unit === unit ? 'bg-accent' : ''}
                >
                  {unit} Units
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu> */}
{/*       
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 w-full max-w-[150px] bg-[#F7F9FC] sm:w-fit ">
            <Filter className="h-4 w-4" />
            Filter
            {activeFilters.length > 0 && (
              <span className="ml-1 h-2 w-2 rounded-full bg-primary"></span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[240px]">
          {Object.entries(groupedOptions).map(([group, groupOptions]) => (
            <React.Fragment key={group}>
              <DropdownMenuLabel>
                {group === 'default' ? 'Filter by' : group}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {groupOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.column}
                  checked={activeFilters.some(f => f.column === option.column)}
                  onCheckedChange={() => handleFilterToggle(option.column)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
              {group !== 'default' && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>  */}
    </div>
  );
};

export default FilterMenu;