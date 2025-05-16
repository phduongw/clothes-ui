'use client';

import React from 'react';
import {useMutation} from "@tanstack/react-query";
import {DatePicker, Form, Radio, Input, FormProps, Button} from "antd";
import {useTranslations} from "next-intl";

import {useRouter} from "@/i18n/navigation";
import {FormDataRegisterFields, IRegisterState, register} from "@/actions/auth-action";

const RegisterForm = () => {
    const router = useRouter();
    const t = useTranslations('home.register');
    const {data, mutate, isPending, error, isError} = useMutation({
        mutationFn: async (formData: FormDataRegisterFields): Promise<IRegisterState> => await register(formData),
    })

    const onFinish: FormProps<FormDataRegisterFields>['onFinish'] = (values) => {
        if (typeof values.dob !== "string") {
            values = {
                ...values,
                dob: values.dob.format('YYYY-MM-DD')
            }
        }

        mutate(values);
    };

    if (data) {
        router.push('/');
    }

    return (
        <div className={'h-[90vh] flex justify-center items-center'}>
            {isError && <p>{error.message}</p>}
            <Form
                layout={'vertical'}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                onFinish={onFinish}
                style={{
                    width: '500px',
                    height: ''
                }}
            >
                <Form.Item
                    label={t('fullName')}
                    name={'fullName'}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={t('email')}
                    name={'email'}
                    rules={[
                        {
                            type: 'email',
                            message: 'This is not a valid email address',
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={t('password')}
                    name={'password'}
                >
                    <Input.Password placeholder={t('password')}/>
                </Form.Item>
                <Form.Item
                    label={t('repeatPassword')}
                    name={'repeatPassword'}
                    rules={[]}
                >
                    <Input.Password placeholder={t('repeatPassword')}/>
                </Form.Item>
                <Form.Item
                    label={t('gender')}
                    name={'gender'}
                >
                    <Radio.Group>
                        <Radio value={'male'}>{t('genderMale')}</Radio>
                        <Radio value={'female'}>{t('genderFemale')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={t('dob')}
                    name={'dob'}
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    label={t('phoneNumber')}
                    name={'phoneNumber'}
                >
                    <Input/>
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type="primary" htmlType="submit" disabled={isPending}>
                        {isPending ? "Processing" : t('title')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;
