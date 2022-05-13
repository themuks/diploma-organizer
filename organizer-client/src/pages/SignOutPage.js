import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "../components/Modal";
import * as actions from "../redux/user/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../components/Spinner";

function SignUpPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(actions.logout());
        setTimeout(() => navigate("/login", { state: { backgroundLocation: location } }), 3000);
    }, [dispatch, location, navigate]);

    return <Modal closeButtonVisible={false}>
        {t("SigningOut")}
        <Spinner/>
    </Modal>;
}

export default SignUpPage;