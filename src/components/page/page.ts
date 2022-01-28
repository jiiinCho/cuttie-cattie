import styles from "./page.module.css";

export default function Page(page: number) {
  const h5 = document.createElement("h5");
  h5.innerText = `Showing page ${page.toString()}`;
  h5.classList.add(`${styles.page}`);
  return h5;
}
