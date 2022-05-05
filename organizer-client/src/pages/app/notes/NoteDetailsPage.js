import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNote, getViewState, ViewState } from "../../../redux/notes/selectors";
import * as actions from "../../../redux/notes/actions";
import Alert from "../../../components/Alert";
import NoteForm from "../../../components/notes/NoteForm";

const NoteDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = note => {
        dispatch(actions.updateNote(id, note));
    };
    const onDelete = () => {
        dispatch(actions.deleteNote(id));
        navigate(-1);
    };

    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const note = useSelector(getNote);

    useEffect(() => {
        dispatch(actions.getNote(id));
    }, [ dispatch, id ]);

    useEffect(() => {
        reset(note);
    }, [ id, note, reset ]);

    switch (viewState) {
        case ViewState.LOADING:
            return <NoteForm
                isLoading={true}
                onDelete={onDelete}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>;
        case ViewState.ERROR:
            return <Alert/>;
        default:
            return <NoteForm
                onDelete={onDelete}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>;
    }
};

export default NoteDetailsPage;