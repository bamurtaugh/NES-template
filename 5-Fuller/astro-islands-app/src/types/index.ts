// NES Demo: Try edits from README scenarios to see Next Edit Suggestions in action

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

export interface ProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: string;
}