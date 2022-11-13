import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingIndicator } from "react-select/dist/declarations/src/components/indicators";
import { EnumRenderFormInputs } from "./inputs/enumRender";
import { IInputProps, ISelectProps } from "./inputs/types";
import "./styles.scss";

export default function Form() {
    const { handleSubmit, register, formState: { errors }, getValues, clearErrors } = useForm({ mode: "onSubmit" });
    const { age: errorAge, name: errorName, } = errors
    const [data, setData] = useState();
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [selectedCity, setSelectedCity] = useState<any[]>([]);
    const [citiesList, setCitiesList] = useState<any[]>([]);

    const fakeLoadOptions = () => {
        return new Promise((resolve) => {
            console.log("fakeLoadOptions");
            setTimeout(() => {
                resolve([
                    { value: "1", label: "Barra do Ribeiro" },
                    { value: "2", label: "Porto Alegre" },
                    { value: "3", label: "Guaíba" },
                    { value: "4", label: "Tapes" },
                    { value: "5", label: "Mariana Pimentel" },
                    { value: "6", label: "Barão do Triunfo" },
                    { value: "7", label: "Sertão Santana" },
                ])
            }, 3000)
        })
    }

    function validateAge(age: any) {
        if (age > 0) return age
        if (Number(age) > 0) return Number(age)
        return 0
    }

    function verifyForErrors(name: string) {
        return errors[name] && errors[name]?.message;
    }

    const onSubmit = (event: any) => {
        const formValues = getValues()
        console.log({ formValues });
        console.log("submit", formValues);
        // setData(formValues)
    }

    async function loadOptions() {
        if (citiesList && !citiesList.length || !citiesList) {
            await fakeLoadOptions().then((data: any) => {
                setCitiesList(data)
                console.log({ data })
                return data;
            })
        }
    }

    const INPUTS: IInputProps[] = [
        {
            name: "name",
            label: "Name",
            type: "string",
            required: true,
            placeholder: "Enter your name",
            value: name,
            error: Boolean(verifyForErrors("name")),
            errors: errorName,
            onChange: (e) => setName(e?.target?.value),
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
            name: "age",
            label: "Age",
            type: "string",
            required: true,
            error: Boolean(verifyForErrors("age")),
            errors: errorAge,
            placeholder: "Enter your age",
            value: age,
            onChange: (e) => setAge(validateAge(e?.target?.value)),
            register: register("age", {
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

    const SELECTS: ISelectProps[] = [
        {
            name: "selectCity",
            label: "Cidades",
            required: true,
            placeholder: "Selecione sua cidade",
            onFocus: async () => await loadOptions(),
            register: register("selectCities", {
                required: {
                    value: true,
                    message: "Campo obrigatório."
                },
            }),
            filterOption: (option: any, rawInput: any) => {
                return citiesList.filter((item: any) => item?.label?.toLowerCase().includes(rawInput?.toLowerCase()))
                // return option.label.toLowerCase().includes(rawInput.toLowerCase())
            },
            errors: errors?.select,
            value: selectedCity,
            onChange: (e: ChangeEvent<any>) => setSelectedCity(e?.target?.value),
            noOptionsMessage: () => <CircularProgress color="secondary" />,
            isClearable: true,
            isSearchable: true,
            defaultOptions: citiesList,
            styles: {
                container: (provided: any) => ({
                    ...provided,
                    height: "100%",
                }),
                content: (provided: any) => ({
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
            onInputChange: (e: any) => {
                console.log({ e })
                if (e?.target?.value) {
                    setSelectedCity(e?.target?.value)
                }
            }

        }
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
            <div className="body">
                {INPUTS.map((input) => EnumRenderFormInputs.TEXT(input))}
                {SELECTS.map((select) => EnumRenderFormInputs.SELECT(select))}
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

