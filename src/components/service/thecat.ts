import { AppendImages, Service } from "../../interface";

export default class Cat implements Service {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }
  getImages = async (page: number, appendImages: AppendImages) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", this.key);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=12&order=asc&page=${page}`,
        requestOptions
      );
      const result = await response.json();
      appendImages(result);
    } catch (e) {
      throw new Error(`unable to fetch data ${e}`);
    }
  };
}
