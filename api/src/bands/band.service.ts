/**
 * Data Model Interfaces
 */

 import { BaseBand, Band } from "./band.interface";
 import { Bands } from "./bands.interface";

 /**
 * In-Memory Store
 */

let bands: Bands = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
    youtubeLink: ""
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
    youtubeLink: ""
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
    youtubeLink: ""
  }
};

/**
 * Service Methods
 */

 export const findAll = async (): Promise<Band[]> => Object.values(bands);

 export const find = async (id: number): Promise<Band> => bands[id];

 export const create = async (newItem: BaseBand): Promise<Band> => {
  const id = new Date().valueOf();

  bands[id] = {
    id,
    ...newItem,
  };

  return bands[id];
};

export const update = async (
  id: number,
  itemUpdate: BaseBand
): Promise<Band | null> => {
  const band = await find(id);

  if (!band) {
    return null;
  }

  bands[id] = { id, ...itemUpdate };

  return bands[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  delete bands[id];
};