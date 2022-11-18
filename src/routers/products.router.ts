import express, { Request, Response } from "express";
import * as ProductService from "../services/products.service";
import { IBaseProduct, IProduct } from "../interface/product.interface";

export const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const items: IProduct[] = await ProductService.findAll();

        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const product: IProduct = await ProductService.find(id);

        if (product && product.length) {
            return res.status(200).send(product);
        }

        res.status(404).send("product not found");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const data: IBaseProduct = req.body;
        const newProduct = await ProductService.create(data);

        res.status(201).json(newProduct);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const productUpdate: IProduct = req.body;
        const existingProduct: IProduct = await ProductService.find(id);

        if (existingProduct) {
            const updatedProduct = await ProductService.update(id, productUpdate);
            return res.status(200).json(updatedProduct);
        }

        const newProduct = await ProductService.create(productUpdate);

        res.status(201).json(newProduct);
    } catch (e) {
        res.status(500).send(e.message);
    }

});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await ProductService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});