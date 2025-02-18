import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { FilterOption, FilterValue } from '@/services/types';

interface FilterMenuProps {
  options: FilterOption[];
  activeFilters: FilterValue[];
  onFilterChange: (filters: FilterValue[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  options,
  activeFilters,
  onFilterChange,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search..."
}) => {
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, FilterOption[]>);

  const handleFilterToggle = (column: string) => {
    const isActive = activeFilters.some(f => f.column === column);
    const newFilters = isActive
      ? activeFilters.filter(f => f.column !== column)
      : [...activeFilters, { column, value: '' }];
    onFilterChange(newFilters);
  };

  return (
    <div className="flex items-center justify-around gap-4">
      <div className="relative flex-1 items-center">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-8 bg-[#F7F9FC] placeholder:text-[.8rem] placeholder:lg:text-[1rem]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
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
      </DropdownMenu>
    </div>
  );
};

export default FilterMenu;