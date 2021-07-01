const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_LIST_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDetailReducer = (
  state = { productItem: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAIL_REQUEST":
      return { loading: true, ...state };
    case "PRODUCT_DETAIL_SUCCESS":
      return { loading: false, productItem: action.payload };
    case "PRODUCT_DETAIL_FAILED":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { productListReducer, productDetailReducer };
