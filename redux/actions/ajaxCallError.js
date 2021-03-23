import { AJAX_CALL_ERROR } from '../types';

export default function ajaxCallError(error) {
    return { 
        type: AJAX_CALL_ERROR,
        payload: error.response.data || {}
    }
}