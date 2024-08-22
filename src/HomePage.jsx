import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      axios
        .get("http://127.0.0.1:9000/protected/resource", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching protected resource:", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
