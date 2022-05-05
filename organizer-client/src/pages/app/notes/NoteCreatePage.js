import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/notes/actions";
import NoteForm from "../../../components/notes/NoteForm";
import { getViewState, ViewState } from "../../../redux/notes/selectors";
import { useNavigate } from "react-router-dom";

const NoteCreatePage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = note => {
        dispatch(actions.createNote(note));
        navigate(-1);
    };

    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);

    switch (viewState) {
        case ViewState.LOADING:
            return (<NoteForm
                isNew={true}
                isLoading={true}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>);
        default:
            return (<NoteForm
                isNew={true}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>);
    }
};

export default NoteCreatePage;