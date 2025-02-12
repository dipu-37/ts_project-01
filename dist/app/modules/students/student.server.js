"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const student_model_1 = require("./student.model");
// const createStudentIntoDB = async (studentData: TStudent) => {
//   // static method //
//   if(await Student.isUserExists(studentData.id)){
//     throw new Error ('use already exists')
//   }
//   const result = await Student.create(studentData); // built in static method
//   // instance method //
//   // const student = new Student(studentData);
//   // if(await student.isUserExists(studentData.id)){
//   //   throw new Error ('user already exists')
//   // }
//   //const result = await student.save();  // built in instance method
//   return result;
// };
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.find();
    return result;
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Student.findOne({id});  // must use id not studentID
    // console.log(result);
    const result = yield student_model_1.Student.aggregate([
        { $match: { id: id } }
    ]);
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.updateOne({ id }, {
        isDeleted: true
    }); // must use id not studentID
    console.log(result);
    return result;
});
exports.StudentServices = {
    // createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
};
