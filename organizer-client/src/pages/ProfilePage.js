import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import ProfileForm from "../components/profile/ProfileForm";
import UserService from "../services/user.service";

function ProfilePage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = user => {
        setIsError(false);
        setIsSaving(true);
        UserService.update(user).then(() => {
        }, () => {
            setIsError(() => true);
        }).finally(() => {
            setIsSaving(() => false);
        });
    };

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        UserService.getCurrentUser().then((response) => {
            const user = response.data;
            reset(user);
        }, () => {
            setIsError(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [reset]);

    return (<Modal>
        <ProfileForm
            onSubmit={handleSubmit(onSubmit)} isSaving={isSaving} register={register}
            errors={errors}/>
    </Modal>);
}

export default ProfilePage;