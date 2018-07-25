const initialState = {
  queries: [],
  observable: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Queryset/REGISTER':
      if (!state.queries.includes(action.payload)) {
        return {
          ...state,
          queries: [...state.queries, action.payload]
        }
      }
      console.error('Queryset Redux action payload already registered')
      return state
    case 'Queryset/DONE':
      const queryset = action.payload
      return {
        ...state,
        observable: Object.assign({}, state.observable, {
          [queryset.queryName]: {
            done: true,
            length: queryset.length
          }
        })
      }
    default:
      return state
  }
}
