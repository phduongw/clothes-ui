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
        throw new Error('Register failed');
    }

    const data = await response.json() as unknown as BaseResponse<IRegisterState>;
    console.log("Register response", data)
    if ( data.status.code !== 200 || !data.data) {
        throw new Error(data.status.message);
    }

    return data.data;
}

export const login = async (prevState: BaseResponse<ILoginState>, formData: FormData) => {
    const dataRequest = Object.fromEntries(formData.entries()) as unknown as FormDataLoginFields;
    const { email, password } = dataRequest;

    try {
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
            return {
                errors: 'Login failed'
            }
        }
        const data = await response.json() as unknown as BaseResponse<ILoginState>;
        if ( data.status.code !== 200) {
            return {
                errors: data.status.message
            }
        }

        return data;
    } catch (error) {
        console.log(error)
        return {
            errors: 'Server error'
        }
    }
};