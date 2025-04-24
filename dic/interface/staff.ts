export interface RegisterStaffData {
  email: string;
  password: string;
  account_type_id: number;
  photo_url: string;
  title: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  local_government: string;
  address: string;
  gender: string;
  department_id: number;
  role_id: number;
}
export const RegisterStaffDummyData = {
  email: "",
  password: "",
  account_type_id: 2,
  photo_url: "",
  title: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  state: "",
  local_government: "",
  address: "",
  gender: "",
  department_id: 0,
  role_id: 1,
};
