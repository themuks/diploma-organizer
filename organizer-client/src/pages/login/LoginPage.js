import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Login from "../../components/login.component";

const Input = ({label, name, register, type = "text", required}) => (
    <>
        <label>{label}</label>
        <input type={type} {...register(name, {required})} />
    </>
);

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {t, i18n} = useTranslation();

    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <Input label={t("Email")} name="email" register={register} required/>
        //     <Input label={t("Password")} name="password" type="password" register={register} required/>
        //     <label>{t("RememberMe")}</label>
        //     <input type="checkbox" {...register("remember-me", {required: true})}/>
        //     {/*{errors.exampleRequired && <span>This field is required</span>}*/}
        //     <input type="submit"/>
        // </form>
        <Login/>
    );
}

export default LoginPage;
