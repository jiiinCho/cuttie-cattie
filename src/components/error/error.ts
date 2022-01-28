import styles from "./error.module.css";
export default function Error() {
  const div = document.createElement("div");
  div.classList.add(`${styles.error}`);
  const h3 = document.createElement("h3");
  h3.innerText = "Something went wrong while fetching data from the server";
  div.appendChild(h3);
  return div;
}
