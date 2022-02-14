/**
 * Required External Modules and Interfaces
 */

 import express, { Request, Response } from "express";
 import * as BandService from "./band.service";
 import { BaseBand, Band } from "./band.interface";

 /**
 * Router Definition
 */

export const bandsRouter = express.Router();


/**
 * Controller Definitions
 */

// GET items

bandsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Band[] = await BandService.findAll();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items/:id

bandsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Band = await BandService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST items

bandsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseBand = req.body;

    const newItem = await BandService.create(item);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT items/:id

bandsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Band = req.body;

    const existingItem: Band = await BandService.find(id);

    if (existingItem) {
      const updatedItem = await BandService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await BandService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

bandsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await BandService.remove(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});