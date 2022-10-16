export async function getNewWord() {
  const word = fetch("https://thatwordleapi.azurewebsites.net/get")
    .then((response) => response.json())
    .then((data) => data.Response.split(""));
  return word;
}
