import { createContext, useContext, useReducer } from "react";
import storageService from "../services/storage";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

const initialState = storageService.loadUser();

export const UserContestProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export default UserContext;
