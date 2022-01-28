import styles from "./app.module.css";
export default class App {
  private readonly root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  run() {
    const h1 = document.createElement("h1");
    h1.innerHTML = "hello";
    h1.classList.add(`${styles.h1}`);
    this.root.appendChild(h1);
  }
}
