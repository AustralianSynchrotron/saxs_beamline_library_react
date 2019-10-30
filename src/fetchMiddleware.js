export const fetchMiddleware = store => {
  return next => action => {
    if (action.fetch) {
      if (action.store) {
        let body = {};
        try {
          body = JSON.parse(action.data.body);
        } catch {
          
        }
        const state = store.getState();
        Object.keys(action.store).forEach(key => {
          let value = state;
          action.store[key].forEach(e => {
            value = value[e];
          });
          body[key] = value;
        });
        action.data.body = JSON.stringify(body);
      }
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
