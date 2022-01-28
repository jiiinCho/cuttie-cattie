import styles from "./button.module.css";
type ButtonCallback = () => void;
export default function Button(
  name: string,
  onClick: ButtonCallback,
  disabled: boolean
) {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = name;
  buttonElement.classList.add(`${styles.button}`);
  disabled && buttonElement.classList.add(`${styles.inactive}`);
  buttonElement.addEventListener("click", onClick);
  return buttonElement;
}
