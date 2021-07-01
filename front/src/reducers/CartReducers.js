const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_CART_ITEM":
      const item = action.payload;
      //note product is id here
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            return x.product === existItem.product ? item : x;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
      break;
    default:
      return state;
  }
};

export default cartReducer;
