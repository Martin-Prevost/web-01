import { parseUrl } from "../../scripts/utils";
import template from "./score.component.html";
import { Component } from "../../scripts/component";
import "./score.component.scss";
import { environment } from "../../scripts/config.js";

export class ScoreComponent extends Component {
  constructor() {
    super(template);
    const params = parseUrl();

    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }

  async init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
    
    const response = await fetch(`${environment.api.host}/scores`);
    if (response.status === 200) {
      this.showScores(await response.json());
    } else {
      console.error("Failed to fetch the scores");
    }
  }

  showScores(scores) {
    const table = document.getElementById("score");
    scores.forEach((score) => {
      const row = document.createElement("tr");

      const name = document.createElement("td");
      name.innerText = score.name;
      const size = document.createElement("td");
      size.innerText = score.size;
      const time = document.createElement("td");
      time.innerText = score.time;
      row.appendChild(name);
      row.appendChild(size);
      row.appendChild(time);

      table.appendChild(row);
    });
  }
}
