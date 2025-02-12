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
exports.UserServices = void 0;
const student_model_1 = require("../students/student.model");
const user_model_1 = require("./user.model");
const createStudentIntoDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user objects
    const userData = {};
    // if password is not given, use default password
    userData.password = password || process.env.DEFAULT_PASS;
    // set use roll
    userData.role = "student";
    // set manually generated id
    userData.id = "2030100001";
    // create a user
    const NewUser = yield user_model_1.User.create(userData); // built in static
    // create a student 
    if (Object.keys(NewUser).length) {
        // set id, _id as user
        studentData.id = NewUser.id; // 
        studentData.user = NewUser._id; // ref _id 
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
    }
});
exports.UserServices = {
    createStudentIntoDB,
};
