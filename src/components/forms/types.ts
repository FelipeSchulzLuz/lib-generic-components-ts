import { BaseTextFieldProps } from "@mui/material";
import { FocusEventHandler, JSXElementConstructor, ReactElement } from "react";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";
import StateManagedSelect, { StylesConfig } from "react-select";

interface IDateProps {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined;
}

interface IInputProps extends BaseTextFieldProps {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined;
}

interface ISelectAsyncProps {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined;
    error: boolean;
    defaultInputValue: string | undefined;
    name: string | undefined;
    label: string | undefined;
    required: Boolean;
    placeholder: string;
    onFocus: FocusEventHandler<HTMLInputElement>;
    noOptionsMessage: () => JSX.Element;
    isClearable: boolean;
    isSearchable: boolean;
    defaultOptions: any[] | undefined;
    styles: StylesConfig;
    // onInputChange: ReactElement<any, any | JSXElementConstructor<any>>;
    
}

export type { IDateProps, IInputProps, ISelectAsyncProps };
