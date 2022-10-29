import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select";
import "./styles.css";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const defaultValues = {
    Native: "",
    TextField: "",
    Select: "",
    ReactSelect: { value: "vanilla", label: "Vanilla" },
    ReactDatepicker: new Date(),
    MUIPicker: new Date("2020-08-01T00:00:00"),
};

export default function Form() {
    const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });
    const [data, setData] = useState(null);

    const createSection = () => {}

    return (
        <form onSubmit={handleSubmit((data: any) => setData(data))} className="form">
            <div className="container">
                <section>
                    <label>React Select</label>
                    <Controller
                        name="ReactSelect"
                        control={control}
                        render={({ field }) => (
                            <ReactSelect
                                isClearable
                                {...field}
                                options={[
                                    { value: "chocolate", label: "Chocolate" },
                                    { value: "strawberry", label: "Strawberry" },
                                    { value: "vanilla", label: "Vanilla" }
                                ]}
                            />
                        )}
                    />
                </section>
                <section>
                    <label>React Datepicker</label>
                    <Controller
                        control={control}
                        name="ReactDatepicker"
                        render={({ field }) => (
                            <ReactDatePicker
                                className="input"
                                placeholderText="Select date"
                                onChange={(e) => field.onChange(e)}
                                selected={field.value}
                            />
                        )}
                    />
                </section>
                <section>
                    <label>React Datepicker</label>
                    <Controller
                        control={control}
                        name="ReactDatepicker"
                        render={({ field }) => (
                            <ReactDatePicker
                                className="input"
                                placeholderText="Select date"
                                onChange={(e) => field.onChange(e)}
                                selected={field.value}
                            />
                        )}
                    />
                </section>
                <section>
                    <label>React Datepicker</label>
                    <Controller
                        control={control}
                        name="ReactDatepicker"
                        render={({ field }) => (
                            <ReactDatePicker
                                className="input"
                                placeholderText="Select date"
                                onChange={(e) => field.onChange(e)}
                                selected={field.value}
                            />
                        )}
                    />
                </section>
            </div>
        </form>
    );
}

