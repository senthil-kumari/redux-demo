const redux = require("redux");
const produce = require("immer").produce;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const initialState = {
  name: "Senthil",
  address: {
    street: "Lockengate C",
    city: "Mississauga",
    state: "Onatario",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

function updateStreet(street) {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = redux.createStore(reducer, applyMiddleware(logger));
console.log("Initial sTate", store.getState());

const unsubscribe = store.subscribe(() => {
  //   console.log("updated state", store.getState());
});

store.dispatch(updateStreet("RAjapalayam rrr"));
unsubscribe();
