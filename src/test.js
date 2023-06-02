import axios from "axios";

const fetchShops = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/shops");
    console.log(response.data);
    // setShops(response.data);
  } catch (error) {
    console.error("Error fetching shops:", error);
  }
};
export default fetchShops;
