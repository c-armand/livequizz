import axios from 'axios';

import { GET_ERRORS } from './types';

export const addQuestion = (question) => dispatch => {
    axios.post(`${process.env.API_URL}/api/questions/add`, question)
        .then(res => console.log('question added'))
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}