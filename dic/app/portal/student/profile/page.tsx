"use client"
import { Edit, Phone, Mail, Save, MapPin, User, Users, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { AuthService } from "@/services/auth/auth.service"
import { studentService } from "@/services/student.service"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  next_of_kin_name: string;
  state: string;
  local_government: string;
  address: string;
}

interface PasswordChangeRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

interface ErrorMessage {
  error: {
    error: string;
  };
}

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
    general: ''
  });
  const [passwordForm, setPasswordForm] = useState<PasswordChangeRequest>({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => studentService.getProfile(),
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (updateData: UpdateProfileRequest) => 
      studentService.updateProfile(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setShowSuccessDialog(true);
    },
    onError: (error: any) => {
      setErrors(prev => ({...prev, general: error?.message || 'Error updating profile'}));
    }
  });

  // Password change mutation
  const changePasswordMutation = useMutation({
    mutationFn: (passwordForm: PasswordChangeRequest) => AuthService.changePassword(passwordForm),
    onSuccess: () => {
      setSuccessMessage('Password changed successfully');
      setShowSuccessDialog(true);
      setPasswordForm({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
      setErrors({
        old_password: '',
        new_password: '',
        confirm_password: '',
        general: ''
      });
    },
    onError: (error: ErrorMessage) => {
      setErrors(prev => ({...prev, general: error?.error?.error || 'Error changing password'}));
    }
  });

  const validatePasswordForm = () => {
    let isValid = true;
    const newErrors = {
      old_password: '',
      new_password: '',
      confirm_password: '',
      general: ''
    };

    // Validate old password
    if (!passwordForm.old_password.trim()) {
      newErrors.old_password = 'Old password is required';
      isValid = false;
    }

    // Validate new password
    if (!passwordForm.new_password.trim()) {
      newErrors.new_password = 'New password is required';
      isValid = false;
    } else if (passwordForm.new_password.length < 8) {
      newErrors.new_password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Validate confirm password
    if (!passwordForm.confirm_password.trim()) {
      newErrors.confirm_password = 'Please confirm your password';
      isValid = false;
    } else if (passwordForm.new_password !== passwordForm.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePasswordChange = async () => {
    if (validatePasswordForm()) {
      changePasswordMutation.mutate(passwordForm);
    }
  };

  const handleSaveProfile = () => {
    if (!profile) return;

    updateProfileMutation.mutate({
      first_name: profile.first_name,
      last_name: profile.last_name,
      next_of_kin_name: profile.next_of_kin_name || '',
      state: profile.state,
      local_government: profile.local_government,
      address: profile.address,
    });
  };

  const togglePasswordVisibility = (field : any) => {
    setShowPasswords(prev => ({...prev, [field]: !prev[field]}));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 bg-white">
      <div className="md:max-w-5xl w-full mx-auto rounded-md">
        <div className="flex flex-col md:flex-row justify-between p-5 space-y-5 md:space-y-0">
          <div>
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Profile</h1>
            <p className="text-gray-600 text-sm md:text-base">view details</p>
          </div>
          <div>
            <button 
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="flex gap-x-3 rounded-md bg-indigo-600 hover:bg-[#080825] text-white px-5 py-2"
            >
              {isEditing ? <Save /> : <Edit />}
              <span className="text-base">{isEditing ? 'Save' : 'Edit'}</span>
            </button>
          </div>
        </div>

        <hr />

        <div>
          <div className="flex flex-col md:flex-row p-5">
            <div className="md:w-1/3 w-full md:border-e-2 border-gray-600">
              <div className="flex items-center gap-x-5">
                <Avatar>
                  <AvatarImage src={profile?.photo_url} />
                  <AvatarFallback>{profile?.first_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="min-w-fit">{profile?.first_name} {profile?.last_name}</span>
              </div>
            </div>
            <div className="md:w-2/3 w-full p-3">
              <div className="flex flex-col">
                <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100">
                  <div className="flex gap-x-2 text-gray-700">
                    <Mail /> <span>Email</span>
                  </div>
                  <p className="text-base md:text-lg text-medium">{profile?.email}</p>
                </div>

                <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100">
                  <div className="flex gap-x-2 text-gray-700">
                    <Phone /> <span>Phone</span>
                  </div>
                  <p className="text-base md:text-lg text-medium">{profile?.phone_number}</p>
                </div>

                <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100">
                  <div className="flex gap-x-2 text-gray-700">
                    <User /> <span>Name</span>
                  </div>
                  {isEditing ? (
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        value={profile?.first_name}
                        onChange={(e) => queryClient.setQueryData(['profile'], {
                          ...profile,
                          first_name: e.target.value,
                        })}
                        className="px-5 py-2 border-none outline-none shadow-md w-full"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={profile?.last_name}
                        onChange={(e) => queryClient.setQueryData(['profile'], {
                          ...profile,
                          last_name: e.target.value,
                        })}
                        className="px-5 py-2 border-none outline-none shadow-md w-full"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <p className="text-base md:text-lg text-medium">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                  )}
                </div>

                {/* Location and Next of Kin sections removed as in original code */}
              </div>
            </div>
          </div>

          {/* Password change section with validation and toggle */}
          <div className="flex flex-col md:flex-row p-5">
            <div className="md:w-1/3 md:border-e-2 border-gray-600">
              <div className="flex flex-col h-full space-y-5 md:space-y-0">
                <p className="text-semibold">Change Password</p>
                {errors.general && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}
                <div className="flex-grow"></div>
                <div className="flex items-end">
                  <button 
                    onClick={handlePasswordChange}
                    className="shadow-xl px-5 py-2 font-medium rounded-md bg-indigo-600 hover:bg-[#080825] text-white"
                    disabled={changePasswordMutation.isPending}
                  >
                    {changePasswordMutation.isPending ? 'Processing...' : 'Change Password'}
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-3">
              <div className="flex flex-col">
                <div className="flex flex-col space-y-2 border-b-2 border-gray-100 p-3">
                  <label>Old Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.oldPassword ? "text" : "password"}
                      value={passwordForm.old_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, old_password: e.target.value }))}
                      className={`px-5 py-2 border-none outline-none shadow-md w-full ${errors.old_password ? 'border-red-500 shadow-red-100' : ''}`}
                      placeholder="Enter your Old Password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => togglePasswordVisibility('oldPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPasswords.oldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.old_password && <p className="text-red-500 text-sm">{errors.old_password}</p>}
                </div>
                <div className="flex flex-col space-y-2 border-b-2 border-gray-100 p-3">
                  <label>New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.newPassword ? "text" : "password"}
                      value={passwordForm.new_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                      className={`px-5 py-2 border-none outline-none shadow-md w-full ${errors.new_password ? 'border-red-500 shadow-red-100' : ''}`}
                      placeholder="Enter your New Password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPasswords.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password}</p>}
                </div>
                <div className="flex flex-col space-y-2 p-3">
                  <label>Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className={`px-5 py-2 border-none outline-none shadow-md w-full ${errors.confirm_password ? 'border-red-500 shadow-red-100' : ''}`}
                      placeholder="Confirm your New Password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPasswords.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Success Dialog */}
          {showSuccessDialog && (
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Success</DialogTitle>
                  <DialogDescription>
                    {successMessage}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <button className="shadow-xl px-5 py-2 font-medium rounded-md bg-indigo-600 hover:bg-[#080825] text-white">
                      Close
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;