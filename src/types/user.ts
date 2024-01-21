import { JsonValue } from "@prisma/client/runtime/library";

type Role = "USER" | "ADMIN";
type EventType = "CLICK" | "PURCHASE" | "SEARCH";
type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
type ShippingStatus = "PENDING" | "SHIPPED" | "DELIVERED";

export type ScalarUser = {
  id?: string;
  email: string;
  password: string;
  avatar: string;
  firstName?: string | null;
  lastName?: string | null;
  role: Role;
};

export type ScalarProduct = {
  id?: string;
  name: string;
  description: string;
  price: number;
  sku: string; // SKU del producto
  images?: Image[];
  brand: string; // Marca del producto
  category: string; // Categoría del producto
  stock: number; // Cantidad en stock
  dimensions?: { height: number; width: number; depth: number } | null | JsonValue; // Dimensiones del producto
  weight: number; // Peso del producto
  materials: string[]; // Materiales del producto
  tags: string[]; // Etiquetas relacionadas con el producto
};

export type Image = {
  id: string;
  color: string; // Color del producto en formato hexadecimal
  url: string; // URL de la imagen del producto
  productId: string; // ID del producto asociado
};

export type Rating = {
  id: string;
  value: number; // Valor de la calificación
  userId: string; // ID del usuario que hizo la calificación
  productId: string; // ID del producto calificado
};

export type Review = {
  id: string;
  content: string; // Contenido de la reseña
  userId: string; // ID del usuario que hizo la reseña
  productId: string; // ID del producto reseñado
};

export type ScalarCart = {
  id?: string;
  quantity: number;
  userId: string;
  productId: string;
};

export type ScalarOrder = {
  id?: string;
  total: number;
  userId: string;
};

export interface Order {
  id: string;
  total: number;
  userId: string;
  user: User;
  orderItems: OrderItem[];
  payment?: Payment;
  paymentId?: string;
  shipping?: Shipping;
  shippingId?: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  productId: string;
  orderId: string;
  product: Product;
  order: Order;
}

export interface Payment {
  id: string;
  method: string;
  status: PaymentStatus;
  orderId: string;
  order: Order;
}

export interface Shipping {
  id: string;
  method: string;
  status: ShippingStatus;
  orderId: string;
  order: Order;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  avatar: string | null;
  role: Role;
  cart: Cart[];
  orders: Order[];
  events: Event[];
  ratings: Rating[]; // Array de objetos Rating
  reviews: Review[]; // Array de objetos Review
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Image[]; // Array de objetos Image
  cart: Cart[];
  orderItems: OrderItem[];
  ratings: Rating[]; // Array de objetos Rating
  reviews: Review[]; // Array de objetos Review
  sku: string; // SKU del producto
  brand: string; // Marca del producto
  category: string; // Categoría del producto
  stock: number; // Cantidad en stock
  dimensions: { height: number; width: number; depth: number }; // Dimensiones del producto
  weight: number; // Peso del producto
  materials: string[]; // Materiales del producto
  tags: string[]; // Etiquetas relacionadas con el producto
}

export interface Cart {
  id: string;
  quantity: number;
  userId: string;
  productId: string;
  user: User;
  product: Product;
}
