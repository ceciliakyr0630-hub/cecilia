
export enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ORDERED = 'ORDERED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  rating: number;
  category: string;
  active: boolean;
}

export interface RequisitionItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Requisition {
  id: string;
  title: string;
  requester: string;
  department: string;
  date: string;
  status: PurchaseStatus;
  items: RequisitionItem[];
  total: number;
}

export type ViewType = 'DASHBOARD' | 'PURCHASE_ORDERS' | 'SUPPLIERS' | 'INVENTORY' | 'AI_INSIGHTS';
