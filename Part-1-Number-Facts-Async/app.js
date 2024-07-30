// 1
let number = 5;
let url = "http://numbersapi.com";

async function favNumber() {
  let data = await $.getJSON(`${url}/${number}?json`);
  console.log(data);
}
favNumber();

// 2
let numbers = [1, 2, 3];

async function favNumbers() {
  let data = await $.getJSON(`${url}/${numbers}?json`);
  console.log(data);
}
favNumbers();

// 3

$(document).ready(function () {
  $("#numberForm").on("submit", async function (event) {
    event.preventDefault();
    const num = $("#inputNum").val();
    await fetchNumberFacts(num);
  });
});

async function fetchNumberFacts(num) {
  const baseUrl = `http://numbersapi.com/${num}`;

  try {
    const promises = Array.from({ length: 4 }, async () => {
      const response = await $.getJSON(`${baseUrl}/?json`);
      return response.text;
    });

    const facts = await Promise.all(promises);
    displayFacts(facts);
  } catch (err) {
    console.error("Error", err);
    $("#factsList").html("<li>Failed to fetch facts.</li>");
  }
}

function displayFacts(facts) {
  const $factsList = $("#factsList");
  $factsList.empty();
  facts.forEach((fact) => {
    $factsList.append(`<li>${fact}</li>`);
  });
}
