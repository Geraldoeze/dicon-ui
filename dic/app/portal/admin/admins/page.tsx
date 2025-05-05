'use client'

import React, { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { adminService } from '@/services/admin.service';

// Define TypeScript interfaces for the form data
interface AdminFormData {
  email: string;
  password: string;
  confirm_password?: string;
  account_type_id: number;
  // photo_url: string | null;
  title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  local_government: string;
  address: string;
  gender: string;
  date_of_birth: string;
  next_of_kin_name: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const AdminRegistration = () => {
  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState<AdminFormData>({
    email: '',
    password: '',
    confirm_password: '',
    account_type_id: 3, // Default to admin
    // photo_url: null,
    title: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    state: '',
    local_government: '',
    address: '',
    gender: '',
    date_of_birth: '',
    next_of_kin_name: '',
  });

  // UI state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        photo_url: 'Please select a valid image file (JPEG, PNG, GIF, or WEBP)'
      });
      return;
    }

    // Create blob URL for preview
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    
    // Store the file object itself
    // setFormData({
    //   ...formData,
    //   photo_url: file as any
    // });
    
    // Clear any previous error
    if (errors.photo_url) {
      setErrors({
        ...errors,
        photo_url: ''
      });
    }
  };

  // Set up mutation for registration
  const registerMutation = useMutation({
    mutationFn: async (data: AdminFormData) => {
      const formDataToSend = new FormData();
      
      // Append all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'confirm_password' && value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      
      // Send the request
      return adminService.register(formDataToSend);
      
    
    },
    onSuccess: () => {
      // Show success message
      setIsSuccessModalOpen(true);
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirm_password: '',
        account_type_id: 3,
        // photo_url: null,
        title: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        state: '',
        local_government: '',
        address: '',
        gender: '',
        date_of_birth: '',
        next_of_kin_name: '',
      });
      setImagePreview(null);
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message || "An error occurred during registration");
      setIsErrorModalOpen(true);
      setIsSubmitting(false);
    }
  });

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Required fields
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email format is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData.confirm_password) newErrors.confirm_password = 'Please confirm your password';
    else if (formData.password !== formData.confirm_password) newErrors.confirm_password = 'Passwords do not match';
    
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    
    if (formData.phone_number && !/^\+?[0-9]{10,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Please enter a valid phone number';
    }
    
    // Date validation
    if (formData.date_of_birth) {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      if (isNaN(birthDate.getTime())) {
        newErrors.date_of_birth = 'Please enter a valid date';
      } else if (birthDate > today) {
        newErrors.date_of_birth = 'Date of birth cannot be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Submit the form data
    const submissionData = { ...formData };
    delete submissionData.confirm_password; // Remove confirm password before submission
    
    registerMutation.mutate(submissionData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Registration</h1>
        <p className="text-gray-600 mt-2">Create a new administrator account with complete profile details</p>
      </header>

      {/* Main Form */}
      <main className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload 
            <div className="flex flex-col items-center space-y-4 pb-6 border-b border-gray-200">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-300">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile Preview"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                name="photo"
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Upload Photo</span>
              </Button>
              {errors.photo_url && (
                <p className="text-red-500 text-sm">{errors.photo_url}</p>
              )}
            </div>
            */}

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title
                </Label>
                <select
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="first_name" className="text-sm font-medium">
                  First Name*
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full ${errors.first_name ? 'border-red-500' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="last_name" className="text-sm font-medium">
                  Last Name*
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full ${errors.last_name ? 'border-red-500' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="date_of_birth" className="text-sm font-medium">
                  Date of Birth
                </Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={`w-full ${errors.date_of_birth ? 'border-red-500' : ''}`}
                  max={new Date().toISOString().split('T')[0]} // Prevent future dates
                />
                {errors.date_of_birth && (
                  <p className="text-red-500 text-sm">{errors.date_of_birth}</p>
                )}
              </div>

              {/* <div className="space-y-1">
                <Label htmlFor="next_of_kin_name" className="text-sm font-medium">
                  Next of Kin
                </Label>
                <Input
                  id="next_of_kin_name"
                  name="next_of_kin_name"
                  value={formData.next_of_kin_name}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter next of kin name"
                />
              </div> */}
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address*
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="admin@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone_number" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className={`w-full ${errors.phone_number ? 'border-red-500' : ''}`}
                    placeholder="+1234567890"
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm">{errors.phone_number}</p>
                  )}
                </div>

                {/* <div className="space-y-1">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter state"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="local_government" className="text-sm font-medium">
                    Local Government
                  </Label>
                  <Input
                    id="local_government"
                    name="local_government"
                    value={formData.local_government}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter local government"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter full address"
                  />
                </div>
                 */}
              </div>
            </div>

            {/* Account Information */}
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="hidden" 
                  name="account_type_id" 
                  value="3" 
                />

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password*
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirm_password" className="text-sm font-medium">
                    Confirm Password*
                  </Label>
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className={`w-full ${errors.confirm_password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                  {errors.confirm_password && (
                    <p className="text-red-500 text-sm">{errors.confirm_password}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register Admin"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registration Successful</DialogTitle>
            <DialogDescription>
              The admin account has been created successfully. They can now log in using the provided credentials.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Registration Failed</DialogTitle>
            <DialogDescription>
              {errorMessage || "There was an error processing your request. Please try again later."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setIsErrorModalOpen(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRegistration;