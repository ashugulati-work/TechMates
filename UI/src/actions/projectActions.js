import {
    INPUT_MSG_SUCCESS,
    INPUT_MSG_FAIL,
    DELETE_MSG_SUCCESS,
    DELETE_MSG_FAIL,
    RETRIVE_MSG_SUCCESS,
    RETRIVE_MSG_FAIL,
    DOWNLOAD_SUCCESS,
    DOWNLOAD_FAIL,
    DOWNLOAD_DATA_EMPTY_SUCCESS
} from "./action_types";

import constant from "../config.json";

export const createInputMessages = (data) => async (dispatch) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({sentence: data.inputMsg})
    };
    var getResponse = await fetch(constant.SERVER_HOST_AND_PORT+'/api/sentence', requestOptions);

    if (getResponse && getResponse.status === 200){
        getResponse = await getResponse.json()
        console.log('getResponse ------------- ', getResponse.data, getResponse.data.length);
        if (getResponse.data && getResponse.data.length > 0){
            dispatch({ type: INPUT_MSG_SUCCESS, payload: getResponse.data });
        }
        }
    dispatch({ type: INPUT_MSG_FAIL, payload: 'Error Occured!!!' }); 
};

export const deleteMessageValue = (deleteId) => async (dispatch) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    var getDeletedResponse = await fetch(constant.SERVER_HOST_AND_PORT+`/api/sentence/${deleteId}`, requestOptions);
    if (getDeletedResponse && getDeletedResponse.status === 200) {
        getDeletedResponse = await getDeletedResponse.json()
        dispatch({ type: DELETE_MSG_SUCCESS, payload: getDeletedResponse.data });
    } else {
        dispatch({ type: DELETE_MSG_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const submitFormData = (messages, rowInput, dropDownValue, tone, keywords) => async (dispatch) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({no_of_sentences:rowInput, sentences: messages, topic: dropDownValue, tone: tone, keywords: keywords })
    };
    var getAllMessagesResponse = await fetch(constant.SERVER_HOST_AND_PORT+'/api/sentences', requestOptions);
    
    const requestOptionsEmpty = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    var getDeletedResponse = await fetch(constant.SERVER_HOST_AND_PORT+`/api/sentence`, requestOptionsEmpty);

    if (getAllMessagesResponse && getAllMessagesResponse.status === 200 && getDeletedResponse && getDeletedResponse.status === 200) {
        getAllMessagesResponse = await getAllMessagesResponse.json()
        dispatch({ type: RETRIVE_MSG_SUCCESS, payload: {getInputMsg:[], retriveMsg:getAllMessagesResponse.data }});
    } else {
        dispatch({ type: RETRIVE_MSG_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const downloadFile = () => async (dispatch) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    var getDownloadResponse = await fetch(constant.SERVER_HOST_AND_PORT+'/api/sentence_file', requestOptions);
    if (getDownloadResponse && getDownloadResponse.status === 200) {
        getDownloadResponse = await getDownloadResponse.json()
        dispatch({ type: DOWNLOAD_SUCCESS, payload: getDownloadResponse.data });
    } else {
        dispatch({ type: DOWNLOAD_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const downloadDataEmpty = () => async (dispatch) => {
    dispatch({ type: DOWNLOAD_DATA_EMPTY_SUCCESS });
};