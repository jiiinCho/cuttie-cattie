import styles from "./button-container.module.css";
import Button from "../button/button";
type ButtonCallback = () => void;
export default function ButtonContainer(
  page: number,
  onPrevClick: ButtonCallback,
  onNextClick: ButtonCallback,
  isLoading: boolean
) {
  const container = document.createElement("div");
  container.classList.add(`${styles.btnContainer}`);

  const prevBtn = isLoading
    ? Button("Previous", onPrevClick, true)
    : Button("Previous", onPrevClick, page === 0);
  const nextBtn = isLoading
    ? Button("Next", onNextClick, true)
    : Button("Next", onNextClick, page === 12);
  container.appendChild(prevBtn);
  container.appendChild(nextBtn);
  return container;
}
