const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const fetchForcast = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then(({ error, forecast }) => {
      if (error) {
        messageOne.textContent = error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";

  fetchForcast(search.value);
});
