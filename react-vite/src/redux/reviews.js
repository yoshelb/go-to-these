const LOAD_USER_REVIEWS = "reviews/loadUserReviews";
const SET_IS_LOADED = "reviews/setIsLoaded";

const loadUserReviews = (reviews) => ({
  type: LOAD_USER_REVIEWS,
  payload: reviews,
});

const setIsLoaded = (payload) => ({
  type: SET_IS_LOADED,
  payload: payload,
});

export const thunkUserReviews = () => async (dispatch) => {
  console.log("BEFORE FETCH");
  dispatch(setIsLoaded(false));
  const response = await fetch("/api/reviews/current");
  if (response.ok) {
    const data = await response.json();
    console.log("REVIEWS IN THUNK", response);
    if (data.errors) {
      return { server: "Something went wrong. Please try again" };
    }

    dispatch(loadUserReviews(data));
    dispatch(setIsLoaded(true));
  }
};

const initialState = { userReviews: null, isLoaded: false };

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REVIEWS: {
      const newReviews = {
        isLoaded: state.isLoaded,
        userReviews: action.payload,
      };
      console.log("NEW REVIEWS IN REDUCER", newReviews);
      return newReviews;
    }
    case SET_IS_LOADED: {
      const newIsLoaded = {
        userReviews: state.userReviews,
        isLoaded: action.payload,
      };
      console.log("NEW isloadedIN REDUCER", newIsLoaded);
      return newIsLoaded;
    }
    default:
      return state;
  }
}

export default reviewReducer;
