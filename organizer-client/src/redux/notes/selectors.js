export const ViewState = {
    LOADING: "LOADING", ERROR: "ERROR", NO_DATA: "NO_DATA", SUCCESS: "SUCCESS"
};

const isLoading = state => {
    return state.notes.isLoading;
};

const hasError = state => {
    return state.notes.hasError;
};

export const getNotes = state => {
    return state.notes.notes;
};

export const getViewState = (state) => {
    if (isLoading(state)) {
        return ViewState.LOADING;
    }

    if (hasError(state)) {
        return ViewState.ERROR;
    }

    if (getNotes(state)?.length === 0) {
        return ViewState.NO_DATA;
    }

    return ViewState.SUCCESS;
};