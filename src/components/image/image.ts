import styles from "./image.module.css";
export default function Image(src: string) {
  const listItem = document.createElement("li");
  listItem.classList.add(`${styles.item}`);
  const imageElement = document.createElement("img");
  imageElement.src = src;
  imageElement.classList.add(`${styles.image}`);

  listItem.appendChild(imageElement);

  return listItem;
}
