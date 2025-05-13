'use server';

import { BaseResponse } from "@/types/BaseResponse";

interface IRegisterState {
    dob: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export interface FormDataRegisterFields {
    fullName: string;
    email: string;
    dob: string;
    gender: string;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
}

export const register = async (prevState: BaseResponse<IRegisterState> | object, formData: FormData) => {
    const dataRequest = Object.fromEntries(formData.entries()) as unknown as FormDataRegisterFields;

    const {
        fullName,
        email,
        dob,
        gender,
        phoneNumber,
        password,
        repeatPassword,
    } = dataRequest;




}