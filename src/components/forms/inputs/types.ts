import { BaseTextFieldProps } from "@mui/material";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";
import reactSelect from "react-select";

interface ISelectProps extends BaseTextFieldProps, reactSelect {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined;
}

interface IDateProps {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined
}

interface IInputProps extends BaseTextFieldProps {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined
}

export type { ISelectProps, IDateProps, IInputProps };