import { FETCH_TEST } from './types';
import moment from 'moment';

export function plsTestMe() {
    return function(dispatch) {

        dispatch({
            type: FETCH_TEST,
            payload: {
                "data": "this is like a test"
            }
        });
      }
}