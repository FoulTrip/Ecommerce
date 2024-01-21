import { prisma } from "@/prisma/db";
import { ScalarProduct } from "@/types/user";
import { Product, Review, Rating, Prisma } from "@prisma/client";

/**
 * ProductService - Clase para manejar las operaciones de los productos en la base de datos.
 */
class ProductService {
  /**
   * Crea un nuevo producto.
   * @param {Partial<Product>} data - Los datos del producto a crear.
   * @returns {Promise<Product>} El producto creado.
   */
  static async create(data: ScalarProduct): Promise<Product> {
    // Transforma cada objeto Image en un objeto ImageCreateWithoutProductInput
    const images =
      data.images?.map((image) => ({
        color: image.color,
        url: image.url,
      })) || [];

    const dimensions = data.dimensions || { height: 0, width: 0, depth: 0 };

    return prisma.product.create({
      data: {
        ...data,
        images: {
          create: images,
        },
        dimensions: dimensions,
      },
    });
  }

  /**
   * Obtiene un producto por su ID.
   * @param {string} id - El ID del producto a obtener.
   * @returns {Promise<Product | null>} El producto obtenido, o null si no se encontró.
   */
  static async get(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  /**
   * Actualiza un producto.
   * @param {string} id - El ID del producto a actualizar.
   * @param {Partial<Product>} data - Los nuevos datos del producto.
   * @returns {Promise<Product>} El producto actualizado.
   */
  static async update(id: string, data: ScalarProduct): Promise<Product> {
    // Transforma cada objeto Image en un objeto ImageCreateWithoutProductInput
    const images =
      data.images?.map((image) => ({
        color: image.color,
        url: image.url,
      })) || [];

    const dimensions = data.dimensions || { height: 0, width: 0, depth: 0 };

    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        images: {
          create: images,
        },
        dimensions: dimensions,
      },
    });
  }

  /**
   * Elimina un producto.
   * @param {string} id - El ID del producto a eliminar.
   * @returns {Promise<Product>} El producto eliminado.
   */
  static async delete(id: string): Promise<Product> {
    const images = await prisma.image.findMany({
      where: {
        productId: id,
      },
    });

    await prisma.image.deleteMany({
      where: {
        productId: id,
      },
    });

    return prisma.product.delete({ where: { id } });
  }
}

export default ProductService;
