import styles from "./content.module.css";
import Image from "../image/image";
import { Service } from "../../../interface";

export default function Content(service: Service, page: number) {
  const ul = document.createElement("ul");
  ul.classList.add(`${styles.ul}`);
  service.getImages(page, (images) => {
    images.map((item) => {
      const image = Image(item.url);
      ul.appendChild(image);
    });
  });

  return ul;
}
