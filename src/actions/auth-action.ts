'use server';

import { BaseResponse } from "@/types/BaseResponse";

interface IRegisterState {
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
};

export interface FormDataRegisterFields {
    fullName: string;
    email: string;
    dob: string;
    gender: string;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
}

export interface FormDataLoginFields {
    email: string;
    password: string;
}

export const register = async (formData: FormData) => {
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

    try {
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
            return {
                errors: 'Register failed'
            }
        }
        const data = await response.json() as unknown as BaseResponse<IRegisterState>;
        if ( data.status.code !== 200) {
            return {
                errors: data.status.message
            }
        }

        return data.data;
    } catch (error) {
        console.log(error)

        return {
            errors: 'Server error'
        }
    }
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