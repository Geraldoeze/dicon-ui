"use client"
import { Edit, Phone, Mail, Calendar, Book, Save, MapPin, User, Users } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { AuthService } from "@/services/auth/auth.service"
import { studentService } from "@/services/student.service"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Toast } from "@/components/ui/toast"

interface UserProfile {
  id: number;
  photo_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  state: string;
  local_government: string;
  address: string;
  next_of_kin_name: string | null;
  date_of_birth: string | null;
}

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

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordChangeRequest>({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

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
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Password change handler
  const handlePasswordChange = async () => {
    try {
      if (passwordForm.new_password !== passwordForm.confirm_password) {
        throw new Error('New passwords do not match');
      }
      
      await AuthService.changePassword(passwordForm);
      setPasswordForm({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 bg-white">
      <div className="md:max-w-5xl w-full mx-auto rounded-md">
        <div className="flex flex-col md:flex-row justify-between p-5">
          <div>
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Profile</h1>
            <p className="text-gray-600 text-sm md:text-base">view details</p>
          </div>
          <div>
            <button 
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="flex gap-x-3 rounded-md bg-[#080825] text-white px-5 py-2"
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
                  <AvatarImage src={profile?.photo_url || "/male.png"} />
                </Avatar>
                <span>{profile?.first_name} {profile?.last_name}</span>
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

                <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100">
                  <div className="flex gap-x-2 text-gray-700">
                    <MapPin /> <span>Location</span>
                  </div>
                  {isEditing ? (
                    <div className="flex flex-col gap-y-2">
                      <input
                        type="text"
                        value={profile?.state}
                        onChange={(e) => queryClient.setQueryData(['profile'], {
                          ...profile,
                          state: e.target.value,
                        })}
                        className="px-5 py-2 border-none outline-none shadow-md w-full"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        value={profile?.local_government}
                        onChange={(e) => queryClient.setQueryData(['profile'], {
                          ...profile,
                          local_government: e.target.value,
                        })}
                        className="px-5 py-2 border-none outline-none shadow-md w-full"
                        placeholder="Local Government"
                      />
                      <input
                        type="text"
                        value={profile?.address}
                        onChange={(e) => queryClient.setQueryData(['profile'], {
                          ...profile,
                          address: e.target.value,
                        })}
                        className="px-5 py-2 border-none outline-none shadow-md w-full"
                        placeholder="Address"
                      />
                    </div>
                  ) : (
                    <p className="text-base md:text-lg text-medium">
                      {profile?.address}, {profile?.local_government}, {profile?.state}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100">
                  <div className="flex gap-x-2 text-gray-700">
                    <Users /> <span>Next of Kin</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile?.next_of_kin_name || ''}
                      onChange={(e) => queryClient.setQueryData(['profile'], {
                        ...profile,
                        next_of_kin_name: e.target.value,
                      })}
                      className="px-5 py-2 border-none outline-none shadow-md w-full"
                      placeholder="Next of Kin Name"
                    />
                  ) : (
                    <p className="text-base md:text-lg text-medium">
                      {profile?.next_of_kin_name || 'Not provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

  
          <div className="flex flex-col md:flex-row p-5">
            <div className="md:w-1/3 md:border-e-2 border-gray-600">
              <div className="flex flex-col h-full">
                <p className="text-semibold">Change Password</p>
                <div className="flex-grow"></div>
                <div className="flex items-end">
                  <button 
                    onClick={handlePasswordChange}
                    className="shadow-xl px-5 py-2 font-medium rounded-md bg-[#080825] text-white"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-3">
              <div className="flex flex-col">
                <div className="flex flex-col space-y-5 border-b-2 border-gray-100 p-3">
                  <label>Old Password</label>
                  <input
                    type="password"
                    value={passwordForm.old_password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, old_password: e.target.value }))}
                    className="px-5 py-2 border-none outline-none shadow-md w-full"
                    placeholder="Enter your Old Password"
                  />
                </div>
                <div className="flex flex-col space-y-5 border-b-2 border-gray-100 p-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                    className="px-5 py-2 border-none outline-none shadow-md w-full"
                    placeholder="Enter your New Password"
                  />
                </div>
                <div className="flex flex-col space-y-5 p-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                    className="px-5 py-2 border-none outline-none shadow-md w-full"
                    placeholder="Confirm your New Password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;