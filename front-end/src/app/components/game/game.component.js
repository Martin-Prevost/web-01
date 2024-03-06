import { parseUrl } from "../../scripts/utils";
import template from "./game.component.html";
import { Component } from "../../scripts/component";
import { CardComponent } from "./card/card.component";
import "./game.component.scss";
import * as localforage from "localforage";

const environment = {
  api: {
    host: "http://localhost:8081",
  },
};

export class GameComponent extends Component {
  constructor() {
    super(template);
    // gather parameters from URL
    const params = parseUrl();
    
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  async init() {
    const name = await localforage.getItem("name");
    const size = await localforage.getItem("size");

    if (this._name == name && this._size == size) {
      this._matchedPairs =
        JSON.parse(await localforage.getItem("matchedPairs")) || 0;
      this._cards = JSON.parse(await localforage.getItem("cards")).map(
        (card) => new CardComponent(card._id, card._flipped, card._matched)
      );
    } else {
      localforage.setItem("name", this._name);
      localforage.setItem("size", this._size);
      this._matchedPairs = 0;
      localforage.setItem("matchedPairs", this._matchedPairs);
      try {
        this._config = await this.fetchConfig();
        this._cards = this._config.ids.map((id) => new CardComponent(id));
        await localforage.setItem("cards", JSON.stringify(this._cards));
      } catch (error) {
        console.error("Failed to fetch the game configuration");
      }
    }

    this._boardElement = document.querySelector(".cards");
    this._cards.forEach((card) => {
      this._boardElement.appendChild(card.getElement());
      card.getElement().addEventListener("click", () => this._flipCard(card));
    });

    this.start();
  }

  start() {
    this._startTime = Date.now();
    let seconds = 0;
    document.querySelector("nav .navbar-title").textContent = `Player: ${
      this._name
    }. Elapsed time: ${seconds++}`;

    this._timer = setInterval(() => {
      document.querySelector("nav .navbar-title").textContent = `Player: ${
        this._name
      }. Elapsed time: ${seconds++}`;
    }, 1000);
  }

  async fetchConfig() {
    const respnse = await fetch(
      `${environment.api.host}/board?size=${this._size}`,
      {
        method: "GET",
      }
    );
    if (respnse.status == 200) {
      return respnse.json();
    } else {
      throw new Error(respnse.status);
    }
  }

  goToScore() {
    localforage.setItem("matchedPairs", null);
    localforage.setItem("cards", null);
    localforage.setItem("name", null);
    localforage.setItem("size", null);

    const timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(() => {
      const scorePage = "./#score";
      window.location = `${scorePage}?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
    }, 750);
  }

  _flipCard(card) {
    if (this._busy) {
      return;
    }

    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;
        localforage.setItem("matchedPairs", JSON.stringify(this._matchedPairs));

        localforage.setItem("cards", JSON.stringify(this._cards));
        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.goToScore();
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(() => {
          // hide the cards
          this._flippedCard.flip();
          card.flip();
          this._busy = false;

          // reset flipped card for the next turn.
          this._flippedCard = null;
        }, 500);
      }
    }
  }
}
