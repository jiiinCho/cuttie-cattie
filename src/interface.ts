interface CatJSON {
  url: string;
}

export type AppendImages = (images: CatJSON[]) => void;
export interface Service {
  getImages: (page: number) => Promise<CatJSON[]>;
}
