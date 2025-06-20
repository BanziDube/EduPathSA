export interface Subject {
  name: string;
  mark: string;
}

export interface FormData {
  ethnicity: EthnicityType | '';
  gender: GenderType | '';
  province: ProvinceType | '';
  grade: GradeType | '';
  subjects: Subject[]
  interests: string[];
  preferredInstitutionType: string;
}

// For Ethnicity
export const ethnicities = ['Mixed Raced', 'African', 'White', 'Asian', 'Other'] as const;
export type EthnicityType = typeof ethnicities[number];

// For Gender
export const genders = ['Male', 'Female'] as const;
export type GenderType = typeof genders[number];

// For Provinces
export const provinces = ['Eastern Cape', 'Western Cape', 'Northen Cape', 'Limpopo', 'kwaZulu-Natal', 'Mpumalanga', 'North West', 'Free State', 'Gauteng'] as const;
export type ProvinceType = typeof provinces[number];

// For Grades
export const grades = ['Grade 11', 'Grade 12', 'Completed Matric'] as const;
export type GradeType = typeof grades[number]

// For subject
export const subjects = [
  'Maths',
  'Life Science',
  'Physical Science',
  'Geography',
  'Economics',
  'History',
  'Accounting',
  'English',
  'Afrikaans',
  'Business Studies',
  'Life Orientation'
] as const;

export type SubjectOption = typeof subjects[number];