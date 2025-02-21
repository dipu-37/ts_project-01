import { AcademicSemester } from './academicSemester.model';

export type TMonths = 'January'| 'February'|'March'|'April'|'May'|'June'|'July'|'August'|'September'|'October'|'November'|'December';

export type TAcademicSemesterName ='Autumn'|'Summer'|'Fall';
export type TAcademicSemesterCode = '01'|'02'|'03' ;

export type TAcademicSemester = {
    name : TAcademicSemesterName;
    code : TAcademicSemesterCode;
    year: String;
    startMonth: TMonths;
    endMonth: TMonths;
}

// 01 = autumn
// 02 = summer
// 03 = fall

export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };