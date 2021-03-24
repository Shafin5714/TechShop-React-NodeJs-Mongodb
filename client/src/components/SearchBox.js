import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import axios from "axios";
const SearchBox = ({ history }) => {
  const [keyword, setKeyWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const fetchProducts = async (keywords) => {
    setKeyWord(keywords);
    try {
      const pageNumber = "";
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      console.log(data.products);
      setSuggestions(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <div className="autocomplete">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => fetchProducts(e.target.value)}
          placeholder="Search Products"
          className="mr-sm-2 ml-sm-5"
          list="wizards-list"
          autocomplete="off"
        ></Form.Control>
      </div>

      <datalist id="wizards-list">
      {suggestions && suggestions.map((p, index) =>  <option>{p.name}</option>)}
        
      </datalist>
      {/* <ul>{suggestions && suggestions.map((p, index) => <li>{p.name}</li>)}</ul> */}

      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
