export const ViewState = {
    LOADING: "LOADING", ERROR: "ERROR", NO_DATA: "NO_DATA", SUCCESS: "SUCCESS"
};

export const isCreateLoading = (state) => {
    return state.tasks.isCreateLoading;
}

const isLoading = state => {
    return state.tasks.isLoading;
};

const hasError = state => {
    return state.tasks.isError;
};

export const getTasks = state => {
    return state.tasks.tasks;
};

export const getViewState = (state) => {
    if (isLoading(state)) {
        return ViewState.LOADING;
    }

    if (hasError(state)) {
        return ViewState.ERROR;
    }

    if (getTasks(state)?.length === 0) {
        return ViewState.NO_DATA;
    }

    return ViewState.SUCCESS;
};