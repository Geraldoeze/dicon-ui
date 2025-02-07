// "use client"
// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowLeft, Upload, Info, Copy } from "lucide-react";
// //import Link from 'next/link';
// import Image from 'next/image';

// // Types
// interface Step {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   isCompleted?: boolean;
// }

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   dateOfBirth: string;
//   academicProgram: string;
//   passportImage?: File;
//   documents?: File;
// }

// // Navigation Component
// const NavigationHeader = ({ onBack, currentStep, totalSteps }: { 
//   onBack: () => void;
//   currentStep: number;
//   totalSteps: number;
// }) => (
//   <div className="flex justify-between items-center w-full mb-8">
//     <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
//       <ArrowLeft className="h-4 w-4" />
//       Back
//     </Button>
//     <Button variant="ghost">
//       {currentStep === totalSteps ? 'Finish' : 'Next'} →
//     </Button>
//   </div>
// );

// // Sidebar Progress Component
// const SidebarProgress = ({ steps, currentStep }: { 
//   steps: Step[];
//   currentStep: number;
// }) => (
//   <div className="w-80 bg-white p-6 min-h-screen">
//     <div className="flex items-center gap-2 mb-8">
//       <Image width={8} height={8} src="/favicon.ico" alt="Logo" className="h-8 w-8" />
//       <h1 className="text-xl font-semibold">Application Portal</h1>
//     </div>
    
//     <div className="space-y-4">
//       {steps.map((step, index) => (
//         <div
//           key={step.id}
//           className={`flex items-start gap-4 p-4 rounded-lg transition-colors
//             ${index === currentStep ? 'bg-primary/5' : ''}
//             ${step.isCompleted ? 'text-primary' : 'text-muted-foreground'}`}
//         >
//           {step.icon}
//           <div>
//             <h3 className="font-medium">{step.title}</h3>
//             <p className="text-sm text-muted-foreground">{step.description}</p>
//           </div>
//           {step.isCompleted && (
//             <div className="ml-auto">
//               <div className="h-2 w-2 rounded-full bg-primary" />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // Basic Info Form
// const BasicInfoForm = ({ formData, setFormData }: {
//   formData: FormData;
//   setFormData: (data: FormData) => void;
// }) => (
//   <div className="space-y-6 max-w-2xl">
//     <h2 className="text-2xl font-bold">Basic Info</h2>
//     <div className="grid grid-cols-2 gap-4">
//       <div className="space-y-2">
//         <label className="text-sm">First name</label>
//         <Input
//           value={formData.firstName}
//           onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//           placeholder="First name"
//         />
//       </div>
//       <div className="space-y-2">
//         <label className="text-sm">Last name</label>
//         <Input
//           value={formData.lastName}
//           onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//           placeholder="Last name"
//         />
//       </div>
//     </div>
//     <div className="space-y-2">
//       <label className="text-sm">Email</label>
//       <Input
//         type="email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         placeholder="you@company.com"
//       />
//     </div>
//     <div className="space-y-2">
//       <label className="text-sm">Phone number</label>
//       <Input
//         value={formData.phone}
//         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//         placeholder="+234 (555) 000-0000"
//       />
//     </div>
//     <div className="space-y-2">
//       <label className="text-sm">Academic Program</label>
//       <Select 
//         value={formData.academicProgram}
//         onValueChange={(value) => setFormData({ ...formData, academicProgram: value })}
//       >
//         <SelectTrigger>
//           <SelectValue placeholder="Select program" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="surveying">Surveying</SelectItem>
//           <SelectItem value="engineering">Engineering</SelectItem>
//           <SelectItem value="science">Science</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   </div>
// );

// // Payment Information Component
// const PaymentInformation = () => (
//   <div className="space-y-6 max-w-2xl">
//     <h2 className="text-2xl font-bold">Payment Information</h2>
//     <Card className="p-6">
//       <p className="text-center mb-6">
//         Pay a sum of ₦5,000.00 non refundable application fee to this account
//       </p>
//       <div className="space-y-4">
//         <div className="flex justify-between py-2">
//           <span className="text-muted-foreground">Account Name</span>
//           <span className="font-medium">DIC UNN</span>
//         </div>
//         <div className="flex justify-between py-2">
//           <span className="text-muted-foreground">Account Number</span>
//           <div className="flex items-center gap-2">
//             <span className="font-medium">1027305293</span>
//             <Button variant="ghost" size="icon">
//               <Copy className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between py-2">
//           <span className="text-muted-foreground">Bank</span>
//           <span className="font-medium">UBA</span>
//         </div>
//       </div>
//       <div className="mt-6 flex justify-center">
//         <Button>Download PG Form</Button>
//       </div>
//     </Card>
//   </div>
// );

// // Document Upload Component
// const DocumentUpload = () => (
//   <div className="space-y-6 max-w-2xl">
//     <h2 className="text-2xl font-bold">Document Upload</h2>
//     <p className="text-muted-foreground">
//       Upload a copy of your passport and the document you filled in earlier stages
//     </p>
    
//     <div className="space-y-6">
//       <div className="border rounded-lg p-6">
//         <div className="flex justify-between items-center mb-2">
//           <div>
//             <h3 className="font-medium">Upload your Image</h3>
//             <p className="text-sm text-muted-foreground">jpg format • Max. 2MB</p>
//           </div>
//           <Button>Upload</Button>
//         </div>
//       </div>
      
//       <div className="border rounded-lg p-6">
//         <div className="flex justify-between items-center mb-2">
//           <div>
//             <h3 className="font-medium">Upload your document</h3>
//             <p className="text-sm text-muted-foreground">PDF format • Max. 5MB</p>
//           </div>
//           <Button>Upload</Button>
//         </div>
//       </div>
//     </div>
    
//     <div className="flex items-start gap-2 text-sm text-muted-foreground">
//       <Info className="h-4 w-4 mt-0.5" />
//       <p>Academic Credentials should be forwarded to dicunn.pgs@gmail.com</p>
//     </div>
//   </div>
// );

// // Success Message Component
// const SuccessMessage = () => (
//   <div className="text-center max-w-2xl mx-auto py-12">
//     <h2 className="text-2xl font-bold mb-4">Application Successful</h2>
//     <p className="text-muted-foreground mb-8">
//       Your application has been submitted and is undergoing review
//     </p>
//     <Button>Keep browsing our site</Button>
//   </div>
// );

// // Main Application Portal Component
// export default function ApplicationPortal() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState<FormData>({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     dateOfBirth: '',
//     academicProgram: '',
//   });

//   const steps: Step[] = [
//     {
//       id: 'basic-info',
//       title: 'Basic Info',
//       description: 'Fill in your basic information',
//       icon: <Info className="h-5 w-5" />,
//       isCompleted: currentStep > 0,
//     },
//     {
//       id: 'payment',
//       title: 'Download form',
//       description: 'Copy bank details and download our PG form',
//       icon: <ArrowLeft className="h-5 w-5" />,
//       isCompleted: currentStep > 1,
//     },
//     {
//       id: 'upload',
//       title: 'Document Upload',
//       description: 'Upload your image and filled copy of the form',
//       icon: <Upload className="h-5 w-5" />,
//       isCompleted: currentStep > 2,
//     },
//   ];

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

// //   const handleNext = () => {
// //     if (currentStep < steps.length) {
// //       setCurrentStep(currentStep + 1);
// //     }
//  // };

//   return (
//     <div className="flex min-h-screen">
//       <SidebarProgress steps={steps} currentStep={currentStep} />
      
//       <div className="flex-1 p-8">
//         <NavigationHeader 
//           onBack={handleBack}
//           currentStep={currentStep}
//           totalSteps={steps.length}
//         />
        
//         {currentStep === 0 && (
//           <BasicInfoForm formData={formData} setFormData={setFormData} />
//         )}
//         {currentStep === 1 && <PaymentInformation />}
//         {currentStep === 2 && <DocumentUpload />}
//         {currentStep === 3 && <SuccessMessage />}
//       </div>
//     </div>
//   );
// }


const page = () => {
  return (
    <div>page</div>
  )
}

export default page;