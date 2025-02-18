"use client"
import { Edit, Phone, Mail, Calendar, Book, Save } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { AuthService } from "@/services/auth/auth.service"


// Type definitions
type PasswordChangeRequest = {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

type ProfileDetail = {
  id: number;
  icon: string;
  text: string;
  detail: string;
}

const Profile = () => {

  const [profileData, setProfileData] = useState<ProfileDetail[]>([
    {
      id: 1,
      icon: <Mail/>,
      text: "Email",
      detail: "Emmanuelakinola@gmail.com"
    }, 
    {
      id: 2,
      icon: <Phone/>,
      text: "Phone",
      detail: "1234567890"
    },
    {
      id: 3,
      icon: <Calendar/>,
      text: "Date of Birth",
      detail: "1st October"
    },
    {
      id: 4,
      icon: <Book/>,
      text: "Academic Program",
      detail: "Defence Intelligence"
    }
  ]);



  return (
    <div className="p-5 bg-white">
      <div className="md:max-w-5xl w-full mx-auto rounded-md">
        <div className="p-5">
          <div>
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Student Profile</h1>
            <p className="text-gray-600 text-sm md:text-base">view details</p>
          </div>
        </div>

        <hr />

        <div>
          <div className="flex flex-col md:flex-row p-5">
            <div className="md:w-1/3 w-full md:border-e-2 border-gray-600">
              <div className="flex items-center gap-x-5">
                <Avatar>
                  <AvatarImage src="/male.png" />
                </Avatar>
                <span>Emmanuel Akinola</span>
              </div>
            </div>
            <div className="md:w-2/3 w-full p-3">
              <div className="flex flex-col">
                {profileData.map((profile) => (
                  <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100 justify-between" key={profile.id}>
                    <div className="flex gap-x-2 text-gray-700">
                      <span>{profile.icon}</span> 
                      <span>{profile.text}</span>
                    </div>
                    <div className="">
                      <p className="text-base md:text-lg text-medium">{profile.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;