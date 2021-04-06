import axios from 'axios';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Book } from '../shared/shared-types/Book'

export interface BookSaveState {
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const SaveBookType = '[Books] Save Book'
const SaveBookSuccessType = '[Books] Save Book Success'
const SaveBookFailureType = '[Books] Save Book Failure'

interface SaveBook {
    type: '[Books] Save Book';
    payload: Book
}

interface SaveBookSuccess {
    type: '[Books] Save Book Success';
}

interface SaveBookFailure {
    type: '[Books] Save Book Failure';
    error: string;
}

type KnownAction = SaveBook | SaveBookSuccess | SaveBookFailure;

export const actionCreators = {
    saveBook: (loadAction: SaveBook): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();

        if (appState) {
            axios({
                method: 'POST',
                url:`${process.env.REACT_APP_SERVER_URL}/books`,
                data: loadAction.payload,
            })
                .then(response => {
                    if(response.status === 400){
                        const responseJson = response.data as unknown as { error: string; };
                        dispatch({type: SaveBookFailureType, error: responseJson.error })
                    }

                    return;
                })
                .then(() => {
                    dispatch({ type: SaveBookSuccessType });
                })
                .catch(() => dispatch({type: SaveBookFailureType, error: 'An error has occurred, please try again.'}));
        }
    }
};

const unloadedState: BookSaveState = { loading: false, loaded: false, error: '' };

export const reducer: Reducer<BookSaveState> = (state: BookSaveState | undefined, incomingAction: Action): BookSaveState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case SaveBookType:
            return {
                ...state,
                loading: true,
            };
        case SaveBookSuccessType:
            return {
                ...state,
                loading: false,
                loaded: true,
            };
        case SaveBookFailureType:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        default:
            return state;
    };
};
