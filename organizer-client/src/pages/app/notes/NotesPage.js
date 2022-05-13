import React, { useEffect } from "react";
import NoteList from "../../../components/notes/NoteList";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../../components/NoData";
import { getNotes, getViewState, ViewState } from "../../../redux/notes/selectors";
import * as actions from "../../../redux/notes/actions";
import Alert from "../../../components/Alert";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/form/Button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/Card";

const NotesPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const notes = useSelector(getNotes);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.getNotes());
    }, [dispatch]);

    switch (viewState) {
        case ViewState.LOADING:
            return <Spinner/>;
        case ViewState.ERROR:
            return <Alert/>;
        case ViewState.NO_DATA:
            return <Card>
                <div className="flex p-4">
                    <Link to="new">
                        <Button text={t("CreateNote")}/>
                    </Link>
                </div>
                <NoData/>
            </Card>;
        default:
            return <Card>
                <div className="flex p-4">
                    <Link to="new">
                        <Button text={t("CreateNote")}/>
                    </Link>
                </div>
                <NoteList notes={notes}/>
            </Card>;
    }
};

export default NotesPage;