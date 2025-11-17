// ---------- App State ----------
let deck = null;

// ---------- UI Helpers ----------
function $(id) {
  return document.getElementById(id);
}

function setDeckFace(color /* "Blue" | "Red" */) {
  $("deckImage").src = `./cards/backs/${color}.png`;
}

function enableDeckClickable(enabled) {
  const el = $("deckImage");
  if (enabled) el.classList.add("clickable");
  else el.classList.remove("clickable");
}

function setShuffleOn(on) {
  const btn = $("shuffleBtn");
  if (on) btn.classList.add("on");
  else btn.classList.remove("on");
}

// ---------- Card Element ----------
function CardElement(card) {
  const div = document.createElement("div");
  div.classList.add("cardHolder");

  const img = document.createElement("img");
  img.classList.add("cardImage");
  img.src = card.imgUrl();
  img.alt = card.toString();

  const p = document.createElement("p");
  p.classList.add("cardInfo");
  p.innerHTML = card.toString();

  div.appendChild(img);
  div.appendChild(p);

  this.div = div;
}

// ---------- Actions ----------
function shuffleDeck() {
  // Create a fresh deck, "Deck" is provided by poker.js
  deck = new Deck();

  // Reset UI
  setDeckFace("Blue");
  enableDeckClickable(true);
  setShuffleOn(false);
  $("playerCards").innerHTML = "";
}

function drawCard() {
  // If deck missing or exhausted, flip to Red, disable, and show Shuffle highlight
  if (!deck || !Array.isArray(deck.cards) || deck.cards.length < 1) {
    setDeckFace("Red");
    enableDeckClickable(false);
    setShuffleOn(true);
    return;
  }

  // Pop & render card
  const card = deck.cards.pop();
  const element = new CardElement(card);
  $("playerCards").appendChild(element.div);

  // If we just used the last card then reflect empty-deck state
  if (deck.cards.length === 0) {
    setDeckFace("Red");
    enableDeckClickable(false);
    setShuffleOn(true);
  }
}

// ---------- Init ----------
window.addEventListener("load", () => {
  // Prevent image dragging ghost
  $("deckImage").addEventListener("dragstart", (e) => e.preventDefault());

  // Initial state
  shuffleDeck();

  // Wire events
  $("deckImage").addEventListener("click", drawCard);
  $("shuffleBtn").addEventListener("click", shuffleDeck);
});
