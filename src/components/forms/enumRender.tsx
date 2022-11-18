
import ReactDatePicker from "react-datepicker";
import TextField from "@mui/material/TextField"
import { ISelectAsyncProps, IInputProps } from "./types";
import AsyncSelect from "react-select/async";
import { FieldError, Merge } from "react-hook-form";
import { height } from "@mui/system";
import { FormLabel } from "@mui/material";

function createSection(key: string | undefined, errors: FieldError | Merge<any, any> | undefined | undefined, children: JSX.Element[]) {
    return (
        <section key={key} className="section">
            <div className="content">{children}</div>
            {typeof errors === "string" && <small className="error" >{errors}</small>}
            {typeof errors === "object" && <small className="error">{errors?.message?.toString()}</small>}
        </section>
    );
}

export const EnumRenderFormInputs = {
    ASYNC_SELECT: (props: ISelectAsyncProps) => createSection(props?.name, props?.errors, [
        <>
            <FormLabel style={{ margin: '0 0 10px 0' }}>{props?.label}</FormLabel>
            <AsyncSelect cacheOptions {...props} className="form__select" />
        </>
    ]),
    DATE: ({ ...props }) => createSection(props?.name, props?.errors, [
        <>
            <FormLabel>{props?.label}</FormLabel>
            <ReactDatePicker {...props} onChange={(date) => props.onChange(date)} />
        </>
    ]),
    TEXT: (props: IInputProps) => createSection(props?.name, props?.errors, [
        <>
            <FormLabel>{props?.label}</FormLabel>
            <TextField fullWidth {...props?.register} {...props} type='string' label={null} />
        </>
    ]),
}