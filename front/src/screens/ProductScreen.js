import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";

import axios from "axios";
const ProductScreen = ({ match }) => {
  // const productItem = products.find((p) => {
  //   return p._id === match.params.id;
  // });

  const [productItem, setProductItem] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get(`/api/products/${match.params.id}`);

      setProductItem(result.data);
    };
    fetchProducts();
  }, [match.params.id]);
  return (
    <>
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
                    {productItem.countInStock > 0 ? "In stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
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
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
    </>
  );
};

export default ProductScreen;
