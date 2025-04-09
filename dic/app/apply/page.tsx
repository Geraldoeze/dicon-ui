"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  MessageCircleWarning,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Alert } from "@/components/ui/alert";
import Image from "next/image";
import { programsService } from "@/services/programs.service";
import { applicationService } from "@/services/application.service";
import { DocumentUpload } from "./documentupload";
import { useQuery, useMutation } from "@tanstack/react-query";

interface Program {
  data: {
    id: string;
    program: string;
  }
}

interface ApplicationFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  program_id: string;
  photo?: File;
  application_form?: File;
}

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface CountryCode {
  code: string;
  dialCode: string;
  name: string;
}

const countryCodes: CountryCode[] = [
  { code: "NG", dialCode: "+234", name: "Nigeria" },
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "UK", dialCode: "+44", name: "United Kingdom" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "GH", dialCode: "+233", name: "Ghana" },
  { code: "KE", dialCode: "+254", name: "Kenya" },
  { code: "ZA", dialCode: "+27", name: "South Africa" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
];

const steps: Step[] = [
  {
    id: "basic-info",
    title: "Basic Info",
    subtitle: "Fill in your basic information",
    icon: "List",
  },
  {
    id: "payment",
    title: "Download form",
    subtitle: "Copy bank details and download our PG form",
    icon: "Download",
  },
  {
    id: "documents",
    title: "Document Upload",
    subtitle: "Upload your image and filled copy of the form",
    icon: "Upload",
  },
];

const ApplicationPortal: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("NG");
  const [uploadedFiles, setUploadedFiles] = useState<{
    photo: File | null;
    application_form: File | null;
  }>({
    photo: null,
    application_form: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      dob: "",
      program_id: "",
    }
  });

  // TanStack Query for fetching programs
  const { data: programs = [] } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const response = await programsService.getPrograms();
      return response?.data || [];
    }
  });

  // TanStack Query mutation for submitting application
  const { mutate: submitApplication, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      const submissionData = {
        ...data,
        photo: uploadedFiles.photo,
        application_form: uploadedFiles.application_form,
        phone: `${countryCodes.find(c => c.code === selectedCountry)?.dialCode || ''} ${data.phone}`
      };
      return await applicationService.submitApplication(submissionData);
    },
    onSuccess: (response) => {
      if (response.message === "success") {
        setCompletedSteps([...completedSteps, steps[currentStep].id]);
        setShowSuccessModal(true);
      }
    },
    onError: (error) => {
      console.error("Submission error:", error);
    }
  });

  const handleProgramChange = (value: string) => {
    setValue('program_id', value);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('dob', e.target.value);
  };

  const nextStep = () => {
    if (currentStep === 0) {
      // Check if basic info is complete before proceeding
      handleSubmit(() => {
        setCompletedSteps([...completedSteps, steps[currentStep].id]);
        setCurrentStep(currentStep + 1);
      })();
    } else {
      // For other steps, just proceed
      setCurrentStep(prev => prev + 1);
    }
  };

  const onSubmit = (data: ApplicationFormData) => {
    submitApplication(data);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Optionally redirect to homepage or application status page
    window.location.href = "/";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 w-full max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="First name"
                error={errors.first_name}
                {...register("first_name", { required: true })}
                placeholder="First name"
              />
              <FormField
                label="Last name"
                error={errors.last_name}
                {...register("last_name", { required: true })}
                placeholder="Last name"
              />
            </div>
            <FormField
              label="Email"
              error={errors.email}
              {...register("email", { required: true })}
              placeholder="you@example.com"
              type="email"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="flex">
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} ({country.dialCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  {...register("phone", { required: true })}
                  className="flex-1 p-2 border rounded-md ml-2"
                  placeholder="555-000-0000"
                />
              </div>
              {errors.phone && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                {...register("dob", { required: true })}
                onChange={handleDateChange}
              />
              {errors.dob && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Academic Program</label>
              <Select onValueChange={handleProgramChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id.toString()}>
                      {program.program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.program_id && (
                <span className="text-red-500 text-sm">Program selection is required</span>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="max-w-xl mx-auto space-y-8 p-4">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Payment Information</h2>
              <p className="text-gray-600">Pay #5000 non-refundable application fee</p>
            </div>
            <div className="space-y-4 border rounded-lg p-6 bg-white">
              <PaymentDetail label="Account Name" value="UNN" />
              <PaymentDetail label="Account Number" value="1027305293" />
              <PaymentDetail label="Bank Name" value="UBA" />
            </div>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <MessageCircleWarning className="text-red-500" size={16} />
                <p>Fill the form and upload it with required documents</p>
              </div>
              <Button
                onClick={() => window.open("/APPLICATION_FORM.pdf")}
                className="bg-[#2D2F93] text-white hover:bg-[#2D2F93]/90"
              >
                Download PG Form
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <DocumentUpload
            onPhotoUpload={(file) => setUploadedFiles(prev => ({ ...prev, photo: file }))}
            onFormUpload={(file) => setUploadedFiles(prev => ({ ...prev, application_form: file }))}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed lg:relative w-[80vw] lg:w-[30vw] z-40 bg-[url('/commandants-bg.jpg')] border-r py-12 px-6
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}>
        <div className="absolute bg-[#F7F9FC]/90 inset-0"></div>
        <div className="relative">
          <div className="flex items-center gap-3 space-x-6 mb-8">
            <div className="flex items-center">
              <Image
                src="/unn.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <Image
                src="/dic.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <h1 className="text-[1.2rem] md:text-[1.5rem] font-semibold">
              Application Portal
            </h1>
          </div>

          <div className="space-y-4 py-12">
            {steps.map((step, index) => (
              <StepIndicator
                key={step.id}
                step={step}
                index={index}
                currentStep={currentStep}
                completedSteps={completedSteps}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            className="mt-4 w-full"
            onClick={() => window.location.href = "/"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to website
          </Button>
        </div>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-4 lg:p-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Navigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onBack={() => setCurrentStep(prev => prev - 1)}
            onNext={nextStep}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />

          <div className="mt-8 bg-white rounded-lg p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          onClose={handleCloseModal}
          applicantName={`${watch('first_name')} ${watch('last_name')}`}
        />
      )}
    </div>
  );
};

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">{label}</label>
    <input
      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      {...props}
    />
    {error && <span className="text-red-500 text-sm">Required</span>}
  </div>
);

interface PaymentDetailProps {
  label: string;
  value: string;
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
);

interface StepIndicatorProps {
  step: Step;
  index: number;
  currentStep: number;
  completedSteps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, index, currentStep, completedSteps }) => (
  <div className={`flex items-center gap-4 p-4 rounded-lg ${currentStep === index ? 'bg-blue-50' : ''}`}>
    <div className="flex-shrink-0">
      {completedSteps.includes(step.id) ? (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-4 h-4 text-green-600" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-sm text-gray-600">{index + 1}</span>
        </div>
      )}
    </div>
    <div>
      <div className={currentStep === index ? '' : 'text-gray-300'}>
        <h3 className="font-medium">{step.title}</h3>
        <p className="text-sm">{step.subtitle}</p>
      </div>
    </div>
  </div>
);

interface SuccessModalProps {
  onClose: () => void;
  applicantName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, applicantName }) => {

  // Use useEffect for safe mount/unmount
  React.useEffect(() => {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you, {applicantName}! Your application has been successfully submitted. We will review your application and contact you soon.
          </p>
          <div className="border-t border-gray-200 w-full pt-4 mt-2">
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <Button 
                onClick={onClose}
                className="bg-[#2D2F93] text-white hover:bg-[#2D2F93]/90"
              >
                Close
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/"}
              >
                Return to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSubmitting
}) => (
  <div className="flex justify-between bg-slate-100 py-4 px-8 rounded-lg">
    <Button
      variant="outline"
      onClick={onBack}
      disabled={currentStep === 0}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
    
    {currentStep < totalSteps - 1 ? (
      <Button
        onClick={onNext}
        className="font-semibold bg-white text-black hover:bg-gray-100 border-[1px] border-gray-300"
      >
        Next
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    ) : (
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="bg-white text-black hover:bg-gray-200 border-[1px] border-gray-300"
      >
        {isSubmitting ? 'Submitting...' : 'Finish'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    )}
  </div>
);

export default ApplicationPortal;