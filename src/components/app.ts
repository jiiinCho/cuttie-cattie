import styles from "./app.module.css";
import Title from "./title/title";
import { Service } from "../interface";
import ButtonContainer from "./button-container/button-container";
import Page from "./page/page";
import Image from "./image/image";

export default class App {
  private readonly root: HTMLElement;
  private readonly service: Service;
  private page: number;
  private btns: HTMLElement;
  private loading: HTMLElement;
  private pageElement: HTMLHeadingElement;
  private ulElement: HTMLUListElement;

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
    this.ulElement = document.createElement("ul");
    this.ulElement.classList.add(`${styles.ul}`);
    this.loading = this.Loading();
  }

  fetchContent = (pageElement: HTMLHeadingElement, buttons: HTMLElement) => {
    this.root.appendChild(this.loading);
    this.ulElement.innerHTML = "";
    this.service //
      .getImages(this.page)
      .then((images) => {
        images.map((item) => {
          const image = Image(item.url);
          this.ulElement.appendChild(image);
        });
      })
      .then(() => {
        this.root.removeChild(this.loading);
        this.root.appendChild(buttons);
        this.root.appendChild(pageElement);
        this.root.appendChild(this.ulElement);
      });
  };

  handleOnPrevClick = () => {
    this.page -= 1;
    this.removeElements();
    this.render();
  };

  handleOnNextClick = () => {
    this.page += 1;
    this.removeElements();
    this.render();
  };

  removeElements = () => {
    this.root.removeChild(this.btns);
    this.root.removeChild(this.pageElement);
    this.root.removeChild(this.ulElement);
  };

  render = () => {
    const newBtns = ButtonContainer(
      this.page,
      this.handleOnPrevClick,
      this.handleOnNextClick
    );
    const newPage = Page(this.page);
    this.fetchContent(newPage, newBtns);
    this.btns = newBtns;
    this.pageElement = newPage;
  };

  Loading = () => {
    const div = document.createElement("div");
    div.classList.add(`${styles.loading}`);
    const h3 = document.createElement("h3");
    h3.innerText = "Loading lovely cats";
    div.appendChild(h3);
    return div;
  };

  run() {
    const title = Title("My Cuttie Cattie");
    this.root.appendChild(title);
    this.root.appendChild(this.btns);
    this.root.appendChild(this.pageElement);
    this.fetchContent(this.pageElement, this.btns);
  }
}
