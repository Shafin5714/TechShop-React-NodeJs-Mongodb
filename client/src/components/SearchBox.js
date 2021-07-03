import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBox.css";

import axios from "axios";
const SearchBox = ({ history }) => {
  const [keyword, setKeyWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [text, setText] = useState("");

  const fetchProducts = async (keywords) => {
    console.log(keywords);

    setText(keywords);
    setKeyWord(keywords);
    if (keywords.trim() !== "") {
      try {
        setSuggestions("");
        const pageNumber = "";
        const { data } = await axios.get(
          `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
        );
        // console.log(data.products);
        setKeyWord("");
        setSuggestions(data.products);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions("");
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
  const productPage = (id) => {
    setSuggestions("");
    setKeyWord("");

    history.push(`/product/${id}`);
  };

  console.log(suggestions);

  return (
    <Form onSubmit={submitHandler} inline>
      <div className="autoContainer">
        <div className="autocomplete">
          <Form.Control
            type="text"
            name="q"
            value={text}
            onChange={(e) => {
              fetchProducts(e.target.value);
            }}
            placeholder="Search Products"
            autoComplete="off"
          ></Form.Control>
        </div>
        <div className="autoItem">
          {suggestions && (
            <ul>
              {suggestions.map((p, index) => (
                <li
                  key={index}
                  onClick={() => {
                    productPage(p._id);
                  }}
                  key={p._id}
                  value={p.name}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* <datalist id="wizards-list">
      {suggestions && suggestions.map((p, index) =>  <option>{p.name}</option>)}
        
      </datalist> */}
      {/* <ul>{suggestions && suggestions.map((p, index) => <li>{p.name}</li>)}</ul> */}

      <Button type="submit" variant="outline-success" className="ml-2 p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
