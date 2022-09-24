import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "878c59833ad2baf39f733f7f215edcaa",
  },
});
