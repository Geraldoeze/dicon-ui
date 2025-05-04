// "use client"
// import { Edit, Phone, Mail, Calendar, Book, Save } from "lucide-react"
// import { Avatar, AvatarImage } from "@/components/ui/avatar"
// import { useState } from "react"
// import { AuthService } from "@/services/auth/auth.service"


// // Type definitions
// type PasswordChangeRequest = {
//   old_password: string;
//   new_password: string;
//   confirm_password: string;
// }

// type ProfileDetail = {
//   id: number;
//   icon: string;
//   text: string;
//   detail: string;
// }

// const Profile = () => {
//   // State management
//   const [isEditing, setIsEditing] = useState(false);
//   const [passwordForm, setPasswordForm] = useState<PasswordChangeRequest>({
//     old_password: '',
//     new_password: '',
//     confirm_password: ''
//   });
//   const [profileData, setProfileData] = useState<ProfileDetail[]>([
//     {
//       id: 1,
//       icon: <Mail/>,
//       text: "Email",
//       detail: "Emmanuelakinola@gmail.com"
//     }, 
//     {
//       id: 2,
//       icon: <Phone/>,
//       text: "Phone",
//       detail: "1234567890"
//     },
//     {
//       id: 3,
//       icon: <Calendar/>,
//       text: "Date of Birth",
//       detail: "1st October"
//     },
//     {
//       id: 4,
//       icon: <Book/>,
//       text: "Academic Program",
//       detail: "Defence Intelligence"
//     }
//   ]);

// //   const [data: profile, isLoading] = useQuery

//   // Password change handler
//   const handlePasswordChange = async () => {
//     try {
//       if (passwordForm.new_password !== passwordForm.confirm_password) {
//         throw new Error('New passwords do not match');
//       }
      
//       await AuthService.changePassword(passwordForm);
//       // Reset form after successful change
//       setPasswordForm({
//         old_password: '',
//         new_password: '',
//         confirm_password: ''
//       });
//       alert('Password changed successfully');
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   // Profile detail update handler
//   const handleDetailUpdate = (id: number, newValue: string) => {
//     setProfileData(prev => 
//       prev.map(item => 
//         item.id === id ? { ...item, detail: newValue } : item
//       )
//     );
//   };

//   return (
//     <div className="p-5 bg-white">
//       <div className="md:max-w-5xl w-full mx-auto rounded-md">
//         <div className="flex flex-col md:flex-row justify-between p-5">
//           <div>
//             <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Profile</h1>
//             <p className="text-gray-600 text-sm md:text-base">view details</p>
//           </div>
//           <div>
//             <button 
//               onClick={() => setIsEditing(!isEditing)}
//               className="flex gap-x-3 rounded-md bg-[#080825] text-white px-5 py-2"
//             >
//               {isEditing ? <Save /> : <Edit />}
//               <span className="text-base">{isEditing ? 'Save' : 'Edit'}</span>
//             </button>
//           </div>
//         </div>

//         <hr />

//         <div>
//           <div className="flex flex-col md:flex-row p-5">
//             <div className="md:w-1/3 w-full md:border-e-2 border-gray-600">
//               <div className="flex items-center gap-x-5">
//                 <Avatar>
//                   <AvatarImage src="/male.png" />
//                 </Avatar>
//                 <span>Emmanuel Akinola</span>
//               </div>
//             </div>
//             <div className="md:w-2/3 w-full p-3">
//               <div className="flex flex-col">
//                 {profileData.map((profile) => (
//                   <div className="flex flex-col space-y-5 p-3 border-b-2 border-gray-100 justify-between" key={profile.id}>
//                     <div className="flex gap-x-2 text-gray-700">
//                       <span>{profile.icon}</span> 
//                       <span>{profile.text}</span>
//                     </div>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         value={profile.detail}
//                         onChange={(e) => handleDetailUpdate(profile.id, e.target.value)}
//                         className="text-base md:text-lg px-5 py-2 border-none outline-none shadow-md"
//                       />
//                     ) : (
//                       <p className="text-base md:text-lg text-medium">{profile.detail}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row p-5">
//             <div className="md:w-1/3 md:border-e-2 border-gray-600">
//               <div className="flex flex-col h-full">
//                 <p className="text-semibold">Change Password</p>
//                 <div className="flex-grow"></div>
//                 <div className="flex items-end">
//                   <button 
//                     onClick={handlePasswordChange}
//                     className="shadow-xl px-5 py-2 font-medium rounded-md bg-[#080825] text-white"
//                   >
//                     Change Password
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="md:w-2/3 p-3">
//               <div className="flex flex-col">
//                 <div className="flex flex-col space-y-5 border-b-2 border-gray-100 p-3">
//                   <label>Old Password</label>
//                   <input
//                     type="password"
//                     value={passwordForm.old_password}
//                     onChange={(e) => setPasswordForm(prev => ({ ...prev, old_password: e.target.value }))}
//                     className="px-5 py-2 border-none outline-none shadow-md w-full"
//                     placeholder="Enter your Old Password"
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-5 border-b-2 border-gray-100 p-3">
//                   <label>New Password</label>
//                   <input
//                     type="password"
//                     value={passwordForm.new_password}
//                     onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
//                     className="px-5 py-2 border-none outline-none shadow-md w-full"
//                     placeholder="Enter your New Password"
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-5 p-3">
//                   <label>Confirm Password</label>
//                   <input
//                     type="password"
//                     value={passwordForm.confirm_password}
//                     onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
//                     className="px-5 py-2 border-none outline-none shadow-md w-full"
//                     placeholder="Confirm your New Password"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;