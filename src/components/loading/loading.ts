import styles from "./loading.module.css";
export default function Loading() {
  const div = document.createElement("div");
  div.classList.add(`${styles.loading}`);
  const h3 = document.createElement("h3");
  h3.innerText = "Loading lovely cats";
  div.appendChild(h3);
  return div;
}
