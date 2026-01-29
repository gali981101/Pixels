import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "563492ad6f91700001000001ae23f059fc2d4086b8f0efe34070dc78";
  const initialURL =
    "https://api.pexels.com/v1/search?query=tokyo&per_page=15&page=1";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url, keyword = "") => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(keyword);
    setPage(1);
  };

  const morePicture = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${nextPage}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${nextPage}`;
    }

    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });

    setData((prev) => prev.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL, "tokyo");
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL, input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>More</button>
      </div>
    </div>
  );
};

export default Homepage;
