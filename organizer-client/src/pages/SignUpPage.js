import React from "react";
import SignUpForm from "../components/user/SignUpForm";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import * as actions from "../redux/user/actions";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = user => {
        console.log(user);
        dispatch(actions.register(user));
        navigate("/login", { replace: true });
    };

    return <Modal closeButtonVisible={false}>
        <SignUpForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>
    </Modal>;
}

export default SignUpPage;