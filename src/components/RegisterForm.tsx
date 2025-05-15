'use client';

import React from 'react';
import { useMutation } from "@tanstack/react-query";

import {FormDataRegisterFields, register} from "@/actions/auth-action";
import { redirect } from "@/i18n/navigation";
import {DatePicker, Form, Radio, Input} from "antd";
import {useTranslations} from "next-intl";

const RegisterForm = () => {
    const t = useTranslations('home.register');

    // const { data, mutate, isPending } = useMutation({
    //     mutationFn: async ( formData: FormData ) => await register(formData),
    //     onSuccess: () => {
    //         redirect({ href: '/', locale: 'en' });
    //     }
    // })

    return (
        <Form
            layout={'vertical'}
            wrapperCol={{ span: 6 }}
        >
            <Form.Item label={t('fullName')}>
                <Input />
            </Form.Item>
            <Form.Item label={t('email')}>
                <Input />
            </Form.Item>
            <Form.Item label={t('password')}>
                <Input.Password placeholder={t('password')} />
            </Form.Item>
            <Form.Item label={t('gender')}>
                <Radio.Group>
                    <Radio value={'male'}>{t('genderMale')}</Radio>
                    <Radio value={'female'}>{t('genderFemale')}</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={t('dob')}>
                <DatePicker />
            </Form.Item>
            <Form.Item label={t('phoneNumber')}>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
