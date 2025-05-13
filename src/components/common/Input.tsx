import React , { FC } from 'react';

const Input: FC<{
    placeholder?: string, typeInput: string, name: string, idEle: string
}> = ( { placeholder, typeInput, name, idEle } ) => {
    return (
        <input
            className={''}
            type={typeInput}
            name={name}
            id={idEle}
            placeholder={placeholder}
        />
    );
};

export default Input;
