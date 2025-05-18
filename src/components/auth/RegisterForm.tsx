'use client';

import React, {useEffect} from 'react';
import {useMutation} from "@tanstack/react-query";
import {DatePicker, Form, Radio, Input, FormProps, Button, Alert} from "antd";
import {useTranslations} from "next-intl";

import {Link, useRouter} from "@/i18n/navigation";
import {FormDataRegisterFields, IRegisterState, register} from "@/actions/auth-action";

const RegisterForm = () => {
    const router = useRouter();
    const t = useTranslations('home.register');
    const t2 = useTranslations('msg.requiredInput.auth');
    const t3 = useTranslations('msg.error');
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

    useEffect(() => {
        if (data) {
            router.push('/');
        }
    }, [data, router]);

    return (
        <div className={'h-[90vh] flex justify-center items-center flex-col'}>
            <h1 className={'text-3xl font-medium'}>{t('title')}</h1>
            {isError && <Alert message={t3(error.message)} type={'error'} banner /> }
            <Form
                layout={'vertical'}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                onFinish={onFinish}
                style={{
                    width: '500px'
                }}
            >
                <Form.Item
                    label={t('fullName')}
                    name={'fullName'}
                    rules={[{
                        required: true,
                        message: t2('fullName')
                    }]}
                >
                    <Input placeholder={t('fullName')} />
                </Form.Item>
                <Form.Item
                    label={t('email')}
                    name={'email'}
                    rules={[
                        {
                            type: 'email',
                            message: t2('emailInvalid')
                        },
                        {
                            required: true,
                            message: t2('emailIsEmpty')
                        }
                    ]}
                >
                    <Input placeholder={t('email')} />
                </Form.Item>
                <Form.Item
                    label={t('password')}
                    name={'password'}
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: t2('passwordIsEmpty'),
                        },
                        {
                            min: 8,
                            message: t2('passwordShort'),
                        },
                    ]}
                >
                    <Input.Password placeholder={t('password')}/>
                </Form.Item>
                <Form.Item
                    label={t('repeatPassword')}
                    name={'repeatPassword'}
                    rules={[{
                        required: true,
                        message: t2('repeatPassword'),
                    }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t2('repeatPasswordNotMatch')));
                        },
                    }),]}
                >
                    <Input.Password placeholder={t('repeatPassword')}/>
                </Form.Item>
                <Form.Item
                    label={t('gender')}
                    name={'gender'}
                    rules={[{
                        required: true,
                        message: t2('gender'),
                    }]}
                >
                    <Radio.Group>
                        <Radio value={'male'}>{t('genderMale')}</Radio>
                        <Radio value={'female'}>{t('genderFemale')}</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={t('dob')}
                    name={'dob'}
                    rules={[{
                        required: true,
                        message: t2('dob'),
                    }]}
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item
                    label={t('phoneNumber')}
                    name={'phoneNumber'}
                    rules={[{
                        required: true,
                        message: t2('phoneNumber'),
                    }]}
                >
                    <Input placeholder={t('phoneNumber')} />
                </Form.Item>
                <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{
                            backgroundColor: 'black',
                        }}
                        type="primary"
                        htmlType="submit"
                        disabled={isPending}
                    >
                        {t('title')}
                    </Button>
                </Form.Item>
            </Form>
            <Link href={`/auth?mode=login`} className={'text-sm underline'}>{t('login')}</Link>
        </div>
    );
};

export default RegisterForm;
