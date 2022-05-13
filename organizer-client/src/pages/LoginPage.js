import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import { useDispatch } from "react-redux";
import * as actions from "../redux/user/actions";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/user/LoginForm";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = user => {
        const onSuccessCallback = () => {
            navigate("/app", { replace: true });
        };
        dispatch(actions.login(user, onSuccessCallback));
    };

    return (
        <Modal closeButtonVisible={false}>
            <LoginForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>
        </Modal>
    );
}

export default LoginPage;
