import axios from "axios";
const info_url = "/info";
const getTotalInfo = async () => {
    const request = axios.get(info_url);
    return request
    .then((response) => response.data)
    .catch((err) => console.error(err));;
  };

  export {getTotalInfo}