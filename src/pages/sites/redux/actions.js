export const SELECTED_SITE_CLICKED = '[SITE] SELECTED_SITE_CLICKED';

export function selectedSiteClicked(id){
    return {type: SELECTED_SITE_CLICKED, payload: id};
}