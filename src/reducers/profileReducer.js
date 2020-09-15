import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  ADD_CONTACT,
  GET_CHATS,
} from "../actions/types";

const initialState = {
  profile: {},
  messgae: {},
  chats: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        message: action.payload,
      };
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        contacts: null,
        profile: {},
        chats: null,
      };
    default:
      return state;
  }
}
