import React, { useEffect } from "react";
import Notes from "../../../components/notes/Notes";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../components/NoData";
import { getNotes, getViewState, ViewState } from "../../../redux/notes/selectors";
import * as actions from "../../../redux/notes/actions";
import Alert from "../../../components/Alert";
import Spinner from "../../../components/Spinner";

const NotesPage = () => {
    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const notes = useSelector(getNotes);

    useEffect(() => {
        dispatch(actions.getNotes());
    }, [ dispatch ]);

    switch (viewState) {
        case ViewState.LOADING:
            return <Spinner/>;
        case ViewState.ERROR:
            return <Alert/>;
        case ViewState.NO_DATA:
            return <NoData/>;
        default:
            return <Notes notes={notes}/>;
    }
};

export default NotesPage;