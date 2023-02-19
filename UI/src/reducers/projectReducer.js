// Import types
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
} from "../actions/action_types";

import constant from "../config.json";

const initialState = {
  getInputMsg: [],
  retriveMsg: [],
  downloadData: undefined
};

// Switch statement - update state
const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log('Payload ', type, payload, typeof payload)
  let { getInputMsg, retriveMsg, downloadData } = state;
  switch (type) {
    case INPUT_MSG_SUCCESS:
      getInputMsg = [...payload];
      return {
        ...state,
        getInputMsg
      };
    case INPUT_MSG_FAIL:
      return {
        ...state
      };
    case DELETE_MSG_SUCCESS:
      getInputMsg = [...payload];
      console.log('*********** ', getInputMsg);
      if (getInputMsg.length === 0) {
        retriveMsg = [];
      }
      return {
        ...state,
        getInputMsg,
        retriveMsg
      };
    case DELETE_MSG_FAIL:
      return {
        ...state
      };
    case RETRIVE_MSG_SUCCESS:
      retriveMsg = [...payload];
      return {
        ...state,
        retriveMsg
      };
    case RETRIVE_MSG_FAIL:
      return {
        ...state
      };
    case DOWNLOAD_SUCCESS:
      downloadData = undefined;
      downloadData = payload;
      console.log('Download ', downloadData);
      return {
        ...state,
        downloadData
      };
    case DOWNLOAD_FAIL:
      return {
        ...state
      };
      case DOWNLOAD_DATA_EMPTY_SUCCESS:
        downloadData = undefined;
        return {
          ...state,
          downloadData
        };
    default:
      return state;
  }
};

export default projectReducer;
