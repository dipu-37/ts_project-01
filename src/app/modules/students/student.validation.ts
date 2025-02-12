import { z } from "zod";

// UserName Validation
const UserNameSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(20, "Name cannot be more than 20 characters"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last name is required"),
});

// Guardian Validation
const GuardianSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's name is required"),
  fatherOccupation: z.string().trim().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().trim().min(1, "Father's contact number is required"),
  motherName: z.string().trim().min(1, "Mother's name is required"),
  motherOccupation: z.string().trim().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().trim().min(1, "Mother's contact number is required"),
});

// Local Guardian Validation
const LocalGuardianSchema = z.object({
  name: z.string().trim().min(1, "Local guardian's name is required"),
  occupation: z.string().trim().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().trim().min(1, "Local guardian's contact number is required"),
  address: z.string().trim().min(1, "Local guardian's address is required"),
});

// Student Validation
export const StudentValidationSchema = z.object({
  id: z.string().trim().min(1, "ID is required"),
  password: z.string().trim().max(20, "password is required"),
  name: UserNameSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().optional(),
  email: z.string().trim().email("Invalid email format"),
  contactNo: z.string().trim().min(1, "Contact number is required"),
  emergencyContactNo: z.string().trim().min(1, "Emergency contact number is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  presentAddress: z.string().trim().min(1, "Present address is required"),
  permanentAddress: z.string().trim().min(1, "Permanent address is required"),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().url("Invalid URL").optional(),
  isActive: z.enum(["active", "blocked"]),
  isDeleted : z.boolean(),
});

