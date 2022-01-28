import styles from "./title.module.css";

export default function Title(text: string) {
  const h1 = document.createElement("h1");
  h1.innerText = text;
  h1.classList.add(`${styles.title}`);
  return h1;
}
