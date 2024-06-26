import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const Card = ({ data }) => {
  const handleCopyTxt = async (e) => {
    try {
      await navigator.clipboard.writeText(e.target.innerText);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div className="card-container">
      <span onClick={handleCopyTxt}>{data.username}</span>
      <span onClick={handleCopyTxt}>{data.password}</span>
    </div>
  );
};

const GetData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const { password } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (password !== process.env.REACT_APP_PASSWORD) {
      navigate("/");
    } else {
      setIsLoading(true);

      axios
        .get(process.env.REACT_APP_SERVER + "/getdata")
        .then(({ data }) => {
          setError("");
          setData(data?.data);
          setIsError(false);
          setIsLoading(false);
          console.log(data);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setError(error.response.data.msg);
          console.log(error);
        });
    }
  }, [password]);

  if (isError) {
    return <span className="error">{error}</span>;
  }

  return (
    <>
      <div className="data-container">
        {
            data?.map((elem) =>{
                return <Card key={elem._id} data={elem} />
            })
        }
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default GetData;
