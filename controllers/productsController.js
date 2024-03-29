import asyncHandler from "express-async-handler";
import ApiController from "./ApiController.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";
import { deleteFiles, deleteFile } from "../utils/deleteFiles.js";

class ProductsController extends ApiController {
  constructor() {
    super(Product);
  }

  addProductImage = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await findByIdOr404(Product, productId);
    const oldProduct = product.toObject();

    if (product.images.length < 4) {
      product.images.push(req.body.image);
    } else {
      throw new ApiError(
        400,
        "This product has reached the maximum number of images.",
      );
    }

    await product.save();
    this.emitter.emit("documentUpdated", oldProduct, product.toObject());

    res
      .status(201)
      .json(new ResponseBuilder().withData(product, "product").build());
  });

  updateProductImage = asyncHandler(async (req, res) => {
    const { productId, imageId } = req.params;
    const product = await findByIdOr404(Product, productId);
    const oldProduct = product.toObject();

    const imageIndex = product.images.findIndex(
      (image) => image._id == imageId,
    );

    if (imageIndex === -1) {
      throw new ApiError(
        404,
        "There is no image with this id for this product.",
      );
    }

    Object.assign(product.images[imageIndex], req.body.image);

    await product.save();
    this.emitter.emit("documentUpdated", oldProduct, product.toObject());

    res
      .status(200)
      .json(new ResponseBuilder().withData(product, "product").build());
  });

  removeProductImage = asyncHandler(async (req, res) => {
    const { productId, imageId } = req.params;
    const product = await findByIdOr404(Product, productId);
    const oldProduct = product.toObject();

    const imageIndex = product.images.findIndex(
      (image) => image._id == imageId,
    );

    if (imageIndex === -1) {
      throw new ApiError(
        404,
        "There is no image with this id for this product.",
      );
    }

    product.images.splice(imageIndex, 1);

    await product.save();
    this.emitter.emit("documentUpdated", oldProduct, product.toObject());

    res
      .status(200)
      .json(new ResponseBuilder().withData(product, "product").build());
  });
}

const productsController = new ProductsController();

productsController.emitter.on(
  "documentUpdated",
  (oldProduct, updatedProduct) => {
    if (
      oldProduct.coverImage &&
      oldProduct.coverImage.path !== updatedProduct.coverImage.path
    ) {
      deleteFile(oldProduct.coverImage.path);
    }

    const oldImagePaths = oldProduct.images.map((image) => image.path);
    const updatedImagePaths = updatedProduct.images.map((image) => image.path);

    const unusedImagePaths = oldImagePaths.filter(
      (item) => !updatedImagePaths.includes(item),
    );

    deleteFiles(unusedImagePaths);
  },
);

productsController.emitter.on("documentDeleted", (product) => {
  if (product.coverImage) {
    deleteFile(product.coverImage.path);
  }

  const imagePaths = product.images.map((image) => image.path);

  deleteFiles(imagePaths);
});

export default productsController;
