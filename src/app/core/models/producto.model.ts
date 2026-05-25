/**
 * Interfaz Producto - Sincronizado con backend
 * Coincide exactamente con DTO del backend
 */
export interface Producto {
  idProducto?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  unidadMedida: string;
  tipoProducto: 'FERTILIZANTE' | 'PESTICIDA' | 'HERBICIDA' | 'FUNGICIDA' | 'SEMILLA' | 'OTRO';
  proveedor: string;
  presentacion: string;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  restoredAt?: string | null;
}

/**
 * DTO para crear/editar productos
 */
export interface ProductoDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  unidadMedida: string;
  tipoProducto: 'FERTILIZANTE' | 'PESTICIDA' | 'HERBICIDA' | 'FUNGICIDA' | 'SEMILLA' | 'OTRO';
  proveedor: string;
  presentacion: string;
}

/**
 * Producto para formularios
 */
export interface ProductoForm extends ProductoDTO {
  idProducto?: number;
}
