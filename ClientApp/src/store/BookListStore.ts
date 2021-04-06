import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Book } from '../shared/shared-types/Book'

export interface BookListState {
    loading: boolean;
    loaded: boolean;
    books: Book[];
}

const loadBooksActionType = '[Books] Load Books'
const loadBooksActionSuccessType = '[Books] Load Books Success'
const loadBooksActionFailureType = '[Books] Load Books Failure'

interface LoadBooksAction {
    type: '[Books] Load Books';
}

interface LoadBooksActionSuccess {
    type: '[Books] Load Books Success';
    books: Book[];
}

interface LoadBooksActionFailure {
    type: '[Books] Load Books Failure';
    error: string;
}

type KnownAction = LoadBooksAction | LoadBooksActionSuccess | LoadBooksActionFailure;

export const actionCreators = {
    loadBooks: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.bookList) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/books`)
                .then(response => {
                    if(response.status === 400){
                        const responseJson = response.json() as unknown as { error: string; };
                        dispatch({type: loadBooksActionFailureType, error: responseJson.error })
                    }

                    return response.json() as Promise<{value: Book[]}>
                })
                .then(data => {
                    dispatch({ type: loadBooksActionSuccessType, books: data.value });
                })
                .catch(() => dispatch({type: loadBooksActionFailureType, error: 'An error has occurred, please try again.'}));
        }
    }
};

const unloadedState: BookListState = { books: [], loading: false, loaded: false };

export const reducer: Reducer<BookListState> = (state: BookListState | undefined, incomingAction: Action): BookListState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case loadBooksActionType:
            return {
                ...state,
                loading: true,
            };
        case loadBooksActionSuccessType:
            return {
                ...state,
                books: action.books,
                loading: false,
                loaded: true,
            };
        case loadBooksActionFailureType:
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        default:
            return state;
    };
};
