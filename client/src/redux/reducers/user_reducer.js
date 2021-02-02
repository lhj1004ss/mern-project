import { LOGIN_USER, REGISTER_USER } from '../actions/types'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, login: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    default:
      return state;
  }
}