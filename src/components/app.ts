import styles from "./app.module.css";
import Content from "./content/content";
import Title from "./title/title";
import { Service } from "../interface";
import ButtonContainer from "./button-container/button-container";
import Page from "./page/page";

export default class App {
  private readonly root: HTMLElement;
  private readonly service: Service;
  private page: number;
  private btns: HTMLElement;
  private loading: HTMLElement;
  private pageElement: HTMLHeadingElement;
  private content: HTMLUListElement;

  constructor(root: HTMLElement, service: Service) {
    this.root = root;
    this.service = service;
    this.page = 0;
    this.btns = ButtonContainer(
      this.page,
      this.handleOnPrevClick,
      this.handleOnNextClick
    );
    this.pageElement = Page(this.page);
    this.content = Content(this.service, this.page);
    this.loading = this.displayLoadingState();
  }

  handleOnPrevClick = () => {
    this.page -= 1;
    this.removeElements();
    this.root.appendChild(this.loading);
    this.render();
    this.root.removeChild(this.loading);
  };

  handleOnNextClick = () => {
    this.page += 1;
    this.removeElements();
    this.root.appendChild(this.loading);
    this.render();
    this.root.removeChild(this.loading);
  };

  removeElements = () => {
    this.root.removeChild(this.btns);
    this.root.removeChild(this.pageElement);
    this.root.removeChild(this.content);
  };

  render = () => {
    const newBtns = ButtonContainer(
      this.page,
      this.handleOnPrevClick,
      this.handleOnNextClick
    );
    const newPage = Page(this.page);
    const newContent = Content(this.service, this.page);

    this.root.appendChild(newBtns);
    this.root.appendChild(newPage);
    this.root.appendChild(newContent);
    this.btns = newBtns;
    this.pageElement = newPage;
    this.content = newContent;
  };

  displayLoadingState = () => {
    const div = document.createElement("div");
    div.classList.add(`${styles.loading}`);
    const h3 = document.createElement("h3");
    h3.innerText = "Loading lovely cats";
    div.appendChild(h3);
    return div;
  };

  run() {
    // const content = Content(this.service, this.page);
    const title = Title("My Cuttie Cattie");
    // const btns = this.buttons();
    // const page = this.displayPage();
    this.root.appendChild(title);
    this.root.appendChild(this.btns);
    this.root.appendChild(this.pageElement);
    this.root.appendChild(this.content);
  }
}
