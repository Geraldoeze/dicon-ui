"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { adminService } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export interface SelectOption {
  id: string | number;
  name: string;
}

interface SelectDepartmentProps {
  onSelect: (selected: SelectOption) => void;
  
}

const SelectDepartment: React.FC<SelectDepartmentProps> = ({ onSelect }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const { data: departments, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => adminService.getDepartments(),
    staleTime: 5 * 60 * 1000
  });
  

  const handleSelectChange = (value: string) => {
    setSelectedDepartment(value);
    const selectedOption = departments?.data?.find(
      (department) => department.id === Number(value)
    );
    if (selectedOption) {
      onSelect(selectedOption);
      setDepartmentName(selectedOption.name);
    }
  };

  return (
    <div className="">
      <Select onValueChange={handleSelectChange} value={selectedDepartment}>
        <SelectTrigger className="">
          <SelectValue
            placeholder={isLoading ? "Loading..." : "Select Department"}
          />
        </SelectTrigger>
        <SelectContent>
          {departments?.data?.map((department) => (
            <SelectItem key={department.id} value={department.id?.toString()}>
              {department.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {departmentName && (
        <div className="flex">
          <div className="bg-blue-600 my-4 rounded-md px-4 py-2">
            <p className=" font-medium text-sm text-white">{departmentName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDepartment;
