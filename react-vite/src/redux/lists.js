const LOAD_USER_LISTS = "lists/loadUserLists";
const SET_IS_LOADED = "lists/setIsLoaded";

const loadUserLists = (lists) => ({
  type: LOAD_USER_LISTS,
  payload: lists,
});

const setIsLoaded = (payload) => ({
  type: SET_IS_LOADED,
  payload: payload,
});

export const thunkUserLists = () => async (dispatch) => {
  console.log("BEFORE FETCH");
  dispatch(setIsLoaded(false));
  const response = await fetch("/api/lists/current");
  if (response.ok) {
    const data = await response.json();
    console.log("lists IN THUNK", response);
    if (data.errors) {
      return { server: "Something went wrong. Please try again" };
    }

    dispatch(loadUserLists(data));
    dispatch(setIsLoaded(true));
  }
};

const initialState = { userLists: null, isLoaded: false };

function listReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_LISTS: {
      const newLists = {
        isLoaded: state.isLoaded,
        userLists: action.payload,
      };
      console.log("NEW Lists IN REDUCER", newLists);
      return newLists;
    }
    case SET_IS_LOADED: {
      const newIsLoaded = {
        userLists: state.userLists,
        isLoaded: action.payload,
      };
      console.log("NEW isloadedIN REDUCER", newIsLoaded);
      return newIsLoaded;
    }
    default:
      return state;
  }
}

export default listReducer;
