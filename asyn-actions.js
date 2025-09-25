const redux = require("redux");
const axios = require("axios");
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;

const thunkMiddleWare = require("redux-thunk").default;

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSucceded = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const store = createStore(reducer, applyMiddleWare(thunkMiddleWare));

const fetchUsers = () => {
  return function (dispatch) {
    store.dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/usersd")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        store.dispatch(fetchUsersSucceded(users));
      })
      .catch((error) => store.dispatch(fetchUsersFailed(error.message)));
  };
};
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
