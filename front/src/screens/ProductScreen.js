import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductsDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  // const productItem = products.find((p) => {
  //   return p._id === match.params.id;
  // });
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, productItem } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={productItem.image} alt={productItem.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{productItem.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={productItem.rating}
                  text={productItem.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price: ${productItem.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {productItem.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${productItem.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {productItem.countInStock > 0
                        ? "In stock"
                        : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {productItem.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(productItem.countInStock).keys()].map(
                            (x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              );
                            }
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={productItem.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
    </>
  );
};

export default ProductScreen;
