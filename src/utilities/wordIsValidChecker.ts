import axios from "axios";

export const wordIsValid = (word: string) => {
  axios
    .get(`https://thatwordleapi.azurewebsites.net/ask/?word=${word}`)
    .then((response) => {
      console.log("DATA RETREIVED: ", response.data.Response);
      return response.data.Response;
    });
};
