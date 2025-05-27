'use client';

import React, {useEffect} from 'react';
import {Alert, Button, Form, FormProps, Input} from "antd";
import {useMutation} from "@tanstack/react-query";
import {useTranslations} from "next-intl";
import { useDispatch } from "react-redux";

import {Link, useRouter} from "@/i18n/navigation";
import { FormDataLoginFields, login } from "@/actions/auth-action";
import {authActions} from "@/stores/actions/auth/authSlice";
import {useToken} from "@/hooks/useToken";

const LoginForm = () => {
    const { set } = useToken();
    const dispatch = useDispatch();
    const router = useRouter();
    const t = useTranslations('home.login');
    const t2 = useTranslations('msg.requiredInput.auth');
    const { data, mutate, isPending, isError, error } = useMutation({
        mutationFn: async (data: FormDataLoginFields) => await login(data),
        onSuccess: (data) => {
            dispatch(authActions.setToken({ token: data!.accessToken, favoriteList: data!.favoriteList }));
            set(data!.accessToken)
        }
    });

    const onFinish: FormProps<FormDataLoginFields>['onFinish'] = (values) => {
        mutate(values);
    }

    useEffect(() => {
        if (data) {
            router.back();
        }
    }, [data, router]);

    return (
        <div className={'h-[90vh] flex justify-center items-center flex-col'}>
            <h1 className={'text-3xl font-medium'}>{t('title')}</h1>
            <Form
                layout={'vertical'}
                labelCol={{span: 8}}
                wrapperCol={{span: 24}}
                style={{
                    width: '500px'
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label={t('email')}
                    name={'email'}
                    rules={[
                        {
                            type: 'email',
                            message: t2('emailInvalid'),
                        },
                        {
                            required: true,
                            message: t2('emailIsEmpty'),
                        }
                    ]}
                >
                    <Input placeholder={t('email')}/>
                </Form.Item>
                <Form.Item
                    label={t('password')}
                    name={'password'}
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please, enter your password',
                        },
                        {
                            min: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    ]}
                >
                    <Input.Password placeholder={t('password')}/>
                </Form.Item>
                { isError && <Alert
                    message={error.message}
                    type={'error'}
                    style={{
                        marginBottom: 12,
                    }}
                    showIcon
                /> }
                <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        style={{
                            backgroundColor: 'black',
                        }}
                        type="primary"
                        htmlType="submit"
                        disabled={isPending}
                    >
                        {isPending ? 'Processing' : t('title')}
                    </Button>
                </Form.Item>
            </Form>
            <Link href={`/auth?mode=register`} className={'text-sm underline'}>{t('register')}</Link>
        </div>
    );
};

export default LoginForm;