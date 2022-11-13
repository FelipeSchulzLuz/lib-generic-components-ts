
import ReactDatePicker from "react-datepicker";
import TextField from "@mui/material/TextField"
import { ISelectProps, IInputProps } from "./types";
import AsyncSelect from "react-select/async";
import { FieldError, Merge } from "react-hook-form";
import { height } from "@mui/system";

function createSection(errors: FieldError | Merge<any, any> | undefined | undefined, children: JSX.Element[]) {
    return (
        <section className="section">
            <div className="content">{children}</div>
            {typeof errors === "string" && <small className="error" >{errors}</small>}
            {typeof errors === "object" && <small className="error">{errors?.message?.toString()}</small>}
        </section>
    );
}

export const EnumRenderFormInputs = {
    SELECT: (props: ISelectProps) => createSection(props?.errors, [
    <AsyncSelect cacheOptions {...props} className="form__select" />
]),
    DATE: ({ ...props }) => createSection(props?.errors, [
    <ReactDatePicker {...props} onChange={(date) => props.onChange(date)} />
]),
    TEXT: (props: IInputProps) => createSection(props?.errors, [
    <TextField fullWidth {...props?.register} {...props} />
]),
}