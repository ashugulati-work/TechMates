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

import axios from "axios";
import constant from "../config.json";

export const createInputMessages = (data) => async (dispatch) => {
    let body = {};
    body['inputMsg'] = data.inputMsg;
    const baseURL = constant.SERVER_HOST_AND_PORT + constant.createInputMessages;
    let getResponse = await axios.post(baseURL, body, {
        headers: constant.ContentType
    });
    console.log('getResponse ------------- ', body, getResponse.data, getResponse.data.length);
    if (getResponse && getResponse.status === 200 && getResponse.data && getResponse.data.length > 0) {
        dispatch({ type: INPUT_MSG_SUCCESS, payload: getResponse.data });
    } else {
        dispatch({ type: INPUT_MSG_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const deleteMessageValue = (deleteValue) => async (dispatch) => {
    const baseURL = constant.SERVER_HOST_AND_PORT + constant.deleteMessage;
    let getDeletedResponse = await axios.delete(baseURL + deleteValue);
    console.log('getDeletedResponse ------------- ', getDeletedResponse);
    if (getDeletedResponse && getDeletedResponse.status === 201) {
        dispatch({ type: DELETE_MSG_SUCCESS, payload: getDeletedResponse.data });
    } else {
        dispatch({ type: DELETE_MSG_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const getAllMessages = () => async (dispatch) => {
    const baseURL = constant.SERVER_HOST_AND_PORT + constant.getAllMessages;
    const config = {
        method: 'GET',
        url: baseURL,
        headers: { "Content-Type": "application/json" }
    }
    let getAllMessagesResponse = await axios(config);
    console.log('getAllMessagesResponse ------------- ', getAllMessagesResponse);
    if (getAllMessagesResponse && getAllMessagesResponse.status === 200) {
        dispatch({ type: RETRIVE_MSG_SUCCESS, payload: getAllMessagesResponse.data });
    } else {
        dispatch({ type: RETRIVE_MSG_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const downloadFile = () => async (dispatch) => {
    const baseURL = constant.SERVER_HOST_AND_PORT + constant.downloadFile;
    const config = {
        method: 'GET',
        url: baseURL,
        headers: { "Content-Type": "application/json" }
    }
    let getDownloadResponse = await axios(config);
    console.log('getDownloadResponse ------------- ', getDownloadResponse);
    if (getDownloadResponse && getDownloadResponse.status === 200) {
        dispatch({ type: DOWNLOAD_SUCCESS, payload: getDownloadResponse.data });
    } else {
        dispatch({ type: DOWNLOAD_FAIL, payload: 'Error Occured!!!' }); 
    }
};

export const downloadDataEmpty = () => async (dispatch) => {
    dispatch({ type: DOWNLOAD_DATA_EMPTY_SUCCESS });
};
