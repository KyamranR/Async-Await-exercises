// 1
let baseURL = "https://deckofcardsapi.com/api/deck";

async function getOneCard() {
  let data = await $.getJSON(`${baseURL}/new/draw`);
  let { suit, value } = data.cards[0];
  console.log(`${value} of ${suit}`);
}
getOneCard();

// 2
async function getTwoCards() {
  let firstCard = await $.getJSON(`${baseURL}/new/draw`);
  let deckId = firstCard.deck_id;
  let secondCard = await $.getJSON(`${baseURL}/${deckId}/draw`);
  [firstCard, secondCard].forEach((card) => {
    let { suit, value } = card.cards[0];
    console.log(`${value} of ${suit}`);
  });
}

// 3
async function setup() {
  let $btn = $("button");
  let $cardArea = $("#card-area");

  let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
  $btn.show().on("click", async function () {
    let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
    let cardSrc = cardData.cards[0].image;
    $cardArea.append(
      $("<img>", {
        src: cardSrc,
      })
    );
    if (cardData.remaining === 0) $btn.remove();
  });
}
setup();
