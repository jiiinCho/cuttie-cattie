import styles from "./button-container.module.css";
import Button from "../button/button";
type ButtonCallback = () => void;
export default function ButtonContainer(
  page: number,
  onPrevClick: ButtonCallback,
  onNextClick: ButtonCallback
) {
  const container = document.createElement("div");
  container.classList.add(`${styles.btnContainer}`);
  const prevBtn = Button("Previous", onPrevClick, page === 0);
  const nextBtn = Button("Next", onNextClick, page === 12);
  container.appendChild(prevBtn);
  container.appendChild(nextBtn);
  return container;
}
