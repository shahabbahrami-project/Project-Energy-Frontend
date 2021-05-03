import { createStore } from 'redux';
import { selectedSiteReducer } from './reducer';

export const selectedSiteStore = createStore(selectedSiteReducer);