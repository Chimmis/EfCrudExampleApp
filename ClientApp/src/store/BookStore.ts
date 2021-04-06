import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Book } from '../shared/shared-types/Book'

export interface BookState {
    loading: boolean;
    loaded: boolean;
    book: Book;
}

const loadBookActionType = '[Books] Load Book'
const loadBookActionSuccessType = '[Books] Load Book Success'
const loadBookActionFailureType = '[Books] Load Book Failure'

interface LoadBookAction {
    type: '[Books] Load Book';
    id: string;
}

interface LoadBookActionSuccess {
    type: '[Books] Load Book Success';
    book: Book;
}

interface LoadBookActionFailure {
    type: '[Books] Load Book Failure';
    error: string;
}

type KnownAction = LoadBookAction | LoadBookActionSuccess | LoadBookActionFailure;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    loadBook: (loadAction: LoadBookAction): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.bookList) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/books/${loadAction.id}`)
                .then(response => {
                    if(response.status === 400){
                        const responseJson = response.json() as unknown as { error: string; };
                        dispatch({type: loadBookActionFailureType, error: responseJson.error })
                    }

                    return response.json() as Promise<Book>
                })
                .then(data => {
                    dispatch({ type: loadBookActionSuccessType, book: data });
                })
                .catch(() => dispatch({type: loadBookActionFailureType, error: 'An error has occurred, please try again.'}));
        }
    }
};

const unloadedState: BookState = { book: {} as Book, loading: false, loaded: false };

export const reducer: Reducer<BookState> = (state: BookState | undefined, incomingAction: Action): BookState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case loadBookActionType:
            return {
                ...state,
                loading: true,
            };
        case loadBookActionSuccessType:
            return {
                ...state,
                book: action.book,
                loading: false,
                loaded: true,
            };
        case loadBookActionFailureType:
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        default:
            return state;
    };
};
