export interface BaseBand {
    name: string;
    price: number;
    description: string;
    image: string;
    youtubeLink: string;
  }
  
  export interface Band extends BaseBand {
    id: number;
  }