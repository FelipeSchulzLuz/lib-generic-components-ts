import { Button, CircularProgress } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EnumRenderFormInputs } from "./enumRender";
import "./styles.scss";
import { IInputProps, ISelectAsyncProps } from "./types";
import { fakeLoadCategoryOptions, fakeLoadPrivacyBannerOptions } from './mock/services.mock'

export default function Form() {
    const { handleSubmit, register, formState: { errors }, getValues, clearErrors } = useForm({ mode: "onSubmit" });
    const { order: errorOrder, name: errorName, category: errorCategory } = errors
    const [name, setName] = useState<string>("");
    const [categoriesList, setCategoriesList] = useState([]);
    const [category, setCategory] = useState('');
    const [order, setOrder] = useState();
    const [selectedCity, setSelectedCity] = useState<string>('');

    useEffect(() => {
        const privacyBanner = fakeLoadPrivacyBannerOptions()
        console.log(privacyBanner)
    }, [])
    
    function validateAge(value: any) {
        if (value > 0) return value
        if (Number(value) > 0) return Number(value)
        return value
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
        if (categoriesList && !categoriesList.length || !categoriesList) {
            await fakeLoadCategoryOptions
            ().then((data: any) => {
                setCategoriesList(data)
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
            placeholder: "Entre com a ordenação",
            required: true,
            error: Boolean(verifyForErrors("order")),
            errors: errorOrder,
            value: order,
            onChange: (e) => setOrder(validateAge(e?.target?.value)),
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
                if (!categoriesList || categoriesList && !categoriesList?.length) await loadOptions()
            },
            register: register("category", {
                required: {
                    value: true,
                    message: "Campo obrigatório."
                },
            }),
            error: Boolean(errorCategory),
            errors: errorCategory,
            onChange: (e: ChangeEvent<any>) => {
                console.log({ e })
                return e?.target?.value
            },
            noOptionsMessage: () => <CircularProgress color="secondary" />,
            isClearable: true,
            isSearchable: true,
            defaultOptions: categoriesList,
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
        }
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
            <div className="body">
                {INPUTS?.map((input) => EnumRenderFormInputs.TEXT(input))}
                {SELECTS?.map((select) => EnumRenderFormInputs.ASYNC_SELECT(select))}
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
