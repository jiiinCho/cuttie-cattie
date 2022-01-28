import styles from "./app.module.css";
import Title from "./title/title";
import { Service } from "../interface";
import ButtonContainer from "./button-container/button-container";
import Page from "./page/page";
import Image from "./image/image";
import Loading from "./loading/loading";
import Error from "./error/error";

export default class App {
  private readonly root: HTMLElement;
  private readonly service: Service;
  private page: number;
  private btns: HTMLElement;
  private loading: HTMLElement;
  private pageElement: HTMLHeadingElement;
  private ulElement: HTMLUListElement;
  // private network: boolean;
  private error: HTMLElement;
  private errorState: boolean;

  constructor(root: HTMLElement, service: Service) {
    this.root = root;
    this.service = service;
    this.page = 0;
    this.btns = ButtonContainer(
      this.page,
      this.handleOnPrevClick,
      this.handleOnNextClick,
      false
    );
    this.pageElement = Page(this.page);
    this.ulElement = document.createElement("ul");
    this.ulElement.classList.add(`${styles.ul}`);
    this.loading = Loading();
    // this.network = navigator.onLine;
    this.error = Error();
    this.errorState = false;
  }

  render = () => {
    const loadingBtns = ButtonContainer(
      this.page,
      this.handleOnPrevClick,
      this.handleOnNextClick,
      true
    );
    this.root.appendChild(loadingBtns);
    this.root.appendChild(this.loading);
    this.ulElement.innerHTML = "";
    this.service //
      .getImages(this.page)
      .then((images) => {
        if (!images) {
          this.root.removeChild(loadingBtns);
          this.root.removeChild(this.loading);
          this.root.appendChild(this.btns);
          this.root.appendChild(this.pageElement);
          this.root.appendChild(this.error); //add error page instead of ulElement
          this.errorState = true;
        }
        images.map((item) => {
          const image = Image(item.url);
          this.ulElement.appendChild(image);
        });
      })
      .then(() => {
        this.root.removeChild(this.loading);
        this.root.removeChild(loadingBtns);
        this.root.appendChild(this.btns);
        this.root.appendChild(this.pageElement);
        this.root.appendChild(this.ulElement);
        this.errorState = false;
      })
      .catch((e: any) => {
        console.log("error catched!");
        console.log(e);
      });
  };

  updateComponents = () => {
    const newBtns = ButtonContainer(
      this.page,
      this.handleOnPrevClick,
      this.handleOnNextClick,
      false
    );
    const newPage = Page(this.page);
    this.btns = newBtns;
    this.pageElement = newPage;
  };

  handleOnPrevClick = () => {
    // this.network = navigator.onLine; //update network status
    this.page -= 1; //update page
    this.removeElements();
    this.updateComponents();
    this.render();
  };

  handleOnNextClick = () => {
    // this.network = navigator.onLine;
    this.page += 1;
    this.removeElements();
    this.updateComponents();
    this.render();
  };

  removeElements = () => {
    this.root.removeChild(this.btns);
    this.root.removeChild(this.pageElement);
    !this.errorState && this.root.removeChild(this.ulElement); //no error -> remove ul
    this.errorState && this.root.removeChild(this.error); //error -> remove error element
  };

  run() {
    const title = Title("My Cuttie Cattie");
    this.root.appendChild(title);
    this.render();
  }
}
