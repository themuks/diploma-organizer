export const ViewState = {
    LOADING: "LOADING", ERROR: "ERROR", NO_DATA: "NO_DATA", SUCCESS: "SUCCESS"
};

const isLoading = state => {
    return state.reminders.isLoading;
};

const hasError = state => {
    return state.reminders.hasError;
};

export const getReminders = state => {
    return state.reminders.reminders;
};

export const getReminder = state => {
    return state.reminders.reminder;
};

export const getViewState = (state) => {
    if (isLoading(state)) {
        return ViewState.LOADING;
    }

    if (hasError(state)) {
        return ViewState.ERROR;
    }

    if (getReminders(state)?.length === 0) {
        return ViewState.NO_DATA;
    }

    return ViewState.SUCCESS;
};