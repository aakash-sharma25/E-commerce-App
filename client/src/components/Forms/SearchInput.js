import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { Box, Button, Fab } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // values.keyword= values.keyword.trim();
      if (values.keyword === "") {
        toast.error("Search field cannot be empty");
        return;
      }
      var search = values.keyword;
      search = search.trim();
      const { data } = await axios.get(`/api/v1/product/search/${search}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap:"5px"
        }}
      >
        <Box sx={{ width: "20vw" }}>
          <input
            style={{
              padding: "8px",
              borderRadius: "10px",
              width: "100%",
              fontSize: "16px",
            }}
            placeholder="Search..."
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          ></input>
        </Box>

        <Button type="submit" sx={{fontSize:"25px"}} >

          <AiOutlineSearch />
        </Button>

      </form>
    </div>
  );
};

export default SearchInput;
