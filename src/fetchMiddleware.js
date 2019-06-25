export const fetchMiddleware = store => {
  return next => action => {
    if (action.fetch) {
      fetch(action.url, action.data)
        .then(response => {
          if (response.status !== 200) {
            return { response: "error" };
          } else {
            return response.json();
          }
        })
        .then(responseData => {
          store.dispatch({ type: action.type, fromServer: true, data: responseData });
        });
    }
    next(action);
  };
};
