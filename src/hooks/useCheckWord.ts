import { useState, useEffect } from "react";
import axios from "axios";

const useCheckWord = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`https://thatwordleapi.azurewebsites.net/ask/?word=${submittedWord}`)
  //     .then((response) => {
  //       console.log("DATA: ", response.data);
  //       setData(response.data.Response);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   console.log("useFetch updated");
  // }, [submittedWord]);

  const checkIsWordValid = (submittedWord: string) => {
    axios
      .get(`https://thatwordleapi.azurewebsites.net/ask/?word=${submittedWord}`)
      .then((response) => {
        console.log("DATA: ", response.data.Response);
        setData(response.data.Response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return data;
  };

  return { data, loading, error, checkIsWordValid };
};

export default useCheckWord;
