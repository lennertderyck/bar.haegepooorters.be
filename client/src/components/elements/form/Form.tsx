import React, { FC, isValidElement, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useFormContext, useWatch } from "react-hook-form";
import {ErrorBoundary} from 'react-error-boundary'

type Props = {
    children?: any;
    onSubmit?: Function;
    onChange?: Function;
    defaultValues?: object;
    loading?: boolean;
    test?: boolean;
    className?: string;
}

const Form: FC<Props> = ({ children, onSubmit, onChange, defaultValues, loading, test, className, ...otherProps }) => {
    const methods = useForm({
        defaultValues
    });
    // const watchedValues = useWatch({
    //     control: methods.control
    // })
    
    const handleSubmit = (values: any) => {
        if (test) {
            alert(JSON.stringify(values, null, 2))
        } else if (!loading) {
            onSubmit && onSubmit(values, methods)
        }
    }

    
    return (
        <FormProvider { ...methods }>
            <form onSubmit={ methods.handleSubmit(handleSubmit) } { ...{ className }}>
                { children }
            </form>
        </FormProvider>
    )
}

export default Form