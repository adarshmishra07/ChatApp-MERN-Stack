import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  ADD_CONTACT,
} from "../actions/types";

const initialState = {
  profile: {},
  messgae: null,
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
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        contacts: null,
        profile: {}
      };
    default:
      return state;
  }
}
