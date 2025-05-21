import { BaseResponse } from "@/types/BaseResponse";
import {Dayjs} from "dayjs";

export interface IRegisterState {
    dob: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

interface ILoginState {
    accessToken: string;
    expiresIn: string;
    favoriteList: string[];
}

export interface IErrorMessages {
  errors: string[] | string;
}

export interface FormDataRegisterFields {
    fullName: string;
    email: string;
    dob: Dayjs | string;
    gender: string;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
}

export interface FormDataLoginFields {
    email: string;
    password: string;
}

export const register = async (formData: FormDataRegisterFields): Promise<IRegisterState> => {
    const {
        fullName,
        email,
        dob,
        gender,
        phoneNumber,
        password,
        repeatPassword,
    } = formData;

    const response = await fetch('http://localhost:8828/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            fullName,
            email,
            dob,
            gender,
            phoneNumber,
            password,
            repeatPassword
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('CW-10-001');
    }

    const data = await response.json() as unknown as BaseResponse<IRegisterState>;
    console.log("Register response", data)
    if ( data.status.code !== 200 || !data.data) {
        throw new Error(data.status.errorCode);
    }

    return data.data;
}

export const login = async (formData: FormDataLoginFields) => {
    const { email, password } = formData;

    const response = await fetch('http://localhost:8828/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('CW-10-001');
    }
    const data = await response.json() as unknown as BaseResponse<ILoginState>;
    if ( data.status.code !== 200) {
        throw new Error(data.status.errorCode);
    }

    return data.data;
};