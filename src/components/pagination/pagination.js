import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useGlobalContext } from "../../utils/ContextProvider";
const baseUrl = "https://60f2479f6d44f300177885e6.mockapi.io/users?";

const Pagination = () => {
  const { fetchData } = useGlobalContext();
  const [dataLength, setDataLength] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const func = () => {
      axios.get(baseUrl).then((res) => {
        setDataLength(res.data.length);
      });
    };
    func();
  }, []);

  const fetchCallback = useCallback(() => {
    fetchData(baseUrl);
  }, [fetchData]);
  useEffect(() => {
    const url = `https://60f2479f6d44f300177885e6.mockapi.io/users?&page=${page}&limit=5`;
    fetchData(url);
  }, [page, fetchData, fetchCallback]);

  let length = Math.ceil(dataLength / 5);
  let devide = [];
  for (let i = 1; i <= length; i++) {
    devide.push(i);
  }
  return (
    <div className="pagination-main">
      {devide.map((num) => {
        return (
          <button onClick={() => setPage(num)} className="btn-pagination-item">
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
