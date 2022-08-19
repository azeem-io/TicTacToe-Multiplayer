import axios from "axios";

export const fetcher = (url: string) =>
   axios
      .get(url, {
         headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => res.data);
