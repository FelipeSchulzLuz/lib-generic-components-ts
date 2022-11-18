import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { ISelectAsyncProps } from "../forms/types";
import { EnumRenderFormInputs } from "./enumRender";
import "./styles.scss";
import { IInputProps, ISelectAsyncProps } from "./types";

export default function Form() {
    const { handleSubmit, register, formState: { errors }, getValues, clearErrors } = useForm({ mode: "onSubmit" });
    const { order: errorOrder, name: errorName, } = errors

    const [name, setName] = useState("");
    const [order, setOrder] = useState();
    const [status, setStatus] = useState();
    const [category, setCategory] = useState();


    function validateOnlyNumber(age: any) {
        if (age > 0) return age
        if (Number(age) > 0) return Number(age)
        return age
    }

    function verifyForErrors(name: string) {
        return errors[name] && errors[name]?.message;
    }

    const onSubmit = (_event: any) => {
        const formValues = getValues()
        console.log({ formValues });
        console.log("submit", formValues);
        // setData(formValues)
    }


    const INPUTS: IInputProps[] = [
        {
            name: "name",
            label: "Name",
            type: "string",
            required: true,
            placeholder: "Enter your name",
            value: name,
            errors: errorName,
            error: Boolean(verifyForErrors("name")),
            onChange: (e: ChangeEvent<any>) => setName(e?.target?.value),
            register: register("name", {
                required: {
                    value: true,
                    message: "Campo obrigatório."
                }, minLength: {
                    value: 3,
                    message: "Mínimo de 3 caracteres."
                }, maxLength: {
                    value: 30,
                    message: "Máximo de 30 caracteres."
                },
                pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Somente letras.",
                },
            }),
        },
        {
            name: "Ordenação",
            label: "Ordenação",
            type: "string",
            required: true,
            placeholder: "Posição a ser apresentado. Ex.: 1 | 2 | ...",
            value: order,
            errors: errorOrder,
            error: Boolean(verifyForErrors("order")),
            onChange: (e: ChangeEvent<any>) => setOrder(validateOnlyNumber(e?.target?.value)),
            register: register("order", {
                required: {
                    value: true,
                    message: "Campo obrigatório."
                },
                min: {
                    value: 1,
                    message: "Valor deve ser maior que zero."
                },
            })
        }
    ]

    const SELECTS: ISelectAsyncProps[] = [
        {
            defaultInputValue: category,
            name: "category",
            label: "Categoria",
            required: true,
            placeholder: "Selecione sua categoria.",
            onFocus: async () => {
                if (!citiesList || citiesList && !citiesList.length) await loadOptions()
            },
            register: register("selectCities", {
                required: {
                    value: true,
                    message: "Campo obrigatório."
                },
            }),
            // filterOption: (_option: any, rawInput: any) => {
            //     // return Boolean(citiesList.filter((item: any) => item?.label?.toLowerCase().includes(rawInput?.toLowerCase())))
            //     // return option.label.toLowerCase().includes(rawInput.toLowerCase())
            // },
            errors: errors?.select,
            onChange: (e: ChangeEvent<any>) => {
                console.log({ e })
                return e?.target?.value
            },
            noOptionsMessage: () => <CircularProgress color="secondary" />,
            isClearable: true,
            isSearchable: true,
            defaultOptions: citiesList,
            styles: {
                container: (provided: any) => ({
                    ...provided,
                    height: "100%",
                }),
                control: (provided: any) => ({
                    ...provided,
                    height: "100%",
                }),
                option: (provided: object, state: any) => ({
                    ...provided,
                    borderBottom: '1px dotted pink',
                    color: state.isSelected ? '#6a5acd' : '#222',
                    padding: 20,
                }),
            },
            // onInputChange: (e: ChangeEvent) => {
            //     if (e?.target?.value) setCategory(e?.target?.value)
            // }
        }
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
            <div className="body">
                {INPUTS.map((input) => EnumRenderFormInputs.TEXT(input))}
                {SELECTS.map((select) => EnumRenderFormInputs.ASYNC_SELECT(select))}
            </div>
            <div className="footer">
                <Button
                    variant="contained"
                    type="submit"
                    onClick={onSubmit}
                    className="button"
                >Salvar</Button>
            </div>
        </form>
    );
}
