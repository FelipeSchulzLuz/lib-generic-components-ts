import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { EnumRenderFormInputs } from "./enumRender";
import "./styles.scss";
import { IInputProps, ISelectAsyncProps } from "./types";
import { fakeLoadPrivacyBannerOptions } from './mock/services.mock'

export default function Form() {
    const { handleSubmit, register, formState: { errors }, getValues, clearErrors } = useForm({ mode: "onSubmit" });
    const { age: errorAge, name: errorName, } = errors
    const [data, setData] = useState();
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [citiesList, setCitiesList] = useState<any[]>([]);

    
    function validateAge(age: any) {
        if (age > 0) return age
        if (Number(age) > 0) return Number(age)
        return 0
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

    async function loadOptions() {
        if (citiesList && !citiesList.length || !citiesList) {
            await fakeLoadPrivacyBannerOptions
            ().then((data: any) => {
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
            name: "ordenacao",
            label: "Ordenação",
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

    const SELECTS: ISelectAsyncProps[] = [
        {
            onMenuOpen: () => loadOptions(),
            onMenuClose: () => console.log(''),
            getOptionLabel: (option: any) => option.label,
            getOptionValue: (option: any) => option.value,
            name: "status",
            label: "Status",
            required: true,
            placeholder: "Selecione sua cidade",
            onFocus: async () => {
                if (!citiesList || citiesList && !citiesList.length) await loadOptions()
            },
            register: register("selectCities", {
                required: {
                    value: true,
                    message: "Campo obrigatório."
                },
            }),
            errors: errors?.select,
            onChange: (e: ChangeEvent<any>) => setSelectedCity(e?.target?.value?.label),
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
            onInputChange: (e: any) => {
                // console.log({ e })
                // if (e?.target?.value) {
                //     setSelectedCity(e?.target?.value)
                // }
            }
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
