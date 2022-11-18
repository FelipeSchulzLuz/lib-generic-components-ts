import { BaseTextFieldProps } from "@mui/material";
import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";
import AsyncSelect, { OnChangeValue, StylesConfig, StateManagedSelect } from "react-select";
import { AsyncProps } from "react-select/async";
import Select,  { Props } from "react-select/dist/declarations/src/Select";
import { StylesConfigFunction, StylesProps } from "react-select/dist/declarations/src/styles";

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

interface ISelectAsyncProps extends AsyncSelect {
    onChange: React.Dispatch<React.SetStateAction<any>>;
    register: UseFormRegisterReturn<any>;
    errors: FieldError | Merge<any, any> | undefined;
    defaultInputValue: string | undefined;
    name: string | undefined;
    label: string | undefined;
    required: Boolean;
    placeholder: string;
    onFocus: Function;
    noOptionsMessage: () => JSX.Element;
    isClearable: boolean;
    isSearchable: boolean;
    defaultOptions: Array<any>;
    styles: StylesConfig;
    onInputChange: StateManagedSelect
}

export type { IDateProps, IInputProps, ISelectAsyncProps };
