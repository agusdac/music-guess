import { ACTION_TYPES } from "./SpotifyActions";

export const SpotifyReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_TOKEN:
            return { ...state, token: action.token }
        default:
            return state
    }
}