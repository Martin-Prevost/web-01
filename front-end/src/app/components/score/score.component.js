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

    document.getElementById("sortSize").addEventListener("click", () => {
      const table = document.getElementById("score");
      Array.from(table.rows)
           .sort((a, b) => parseInt(b.cells[1].innerText) - parseInt(a.cells[1].innerText))
           .forEach(row => table.appendChild(row));
    });
    document.getElementById("sortTime").addEventListener("click", () => {
      const table = document.getElementById("score");
      Array.from(table.rows)
           .sort((a, b) => parseInt(a.cells[2].innerText) - parseInt(b.cells[2].innerText))
           .forEach(row => table.appendChild(row));
    });
    document.getElementById("sortTimeBySize").addEventListener("click", () => {
      const table = document.getElementById("score");
      Array.from(table.rows)
           .sort((a, b) => parseInt(a.cells[3].innerText) - parseInt(b.cells[3].innerText))
           .forEach(row => table.appendChild(row));
    });
    document.getElementById("sortName").addEventListener("click", () => {
      const table = document.getElementById("score");
      Array.from(table.rows)
           .sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText))
           .forEach(row => table.appendChild(row));
    });
  }

  showScores(scores) {
    const table = document.getElementById("score");
    scores.sort((a, b) => a.time / a.size - b.time / b.size)
          .forEach((score) => {
            const row = document.createElement("tr");

            const name = document.createElement("td");
            name.innerText = score.name;
            const size = document.createElement("td");
            size.innerText = score.size;
            const time = document.createElement("td");
            time.innerText = score.time;
            const timeBySize = document.createElement("td");
            timeBySize.innerText = score.time / score.size;

            row.appendChild(name);
            row.appendChild(size);
            row.appendChild(time);
            row.appendChild(timeBySize);

            table.appendChild(row);
          });
  }
}
