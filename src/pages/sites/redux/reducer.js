import {SELECTED_SITE_CLICKED} from './actions'


export function selectedSiteReducer(state = null, action) {
        switch (action.type) {
            case SELECTED_SITE_CLICKED:
                return action.payload;
            default:
                return state;
        }
}