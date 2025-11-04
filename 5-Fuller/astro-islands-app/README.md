# Astro Islands App: Copilot Next Edit Suggestions Demo

This project demonstrates how Copilot Next Edit Suggestions (NES) can help with component prop updates across Astro islands. The application showcases a multi-framework setup with React and Vue components that share common data structures and prop interfaces.

## Project Structure

```
astro-islands-app/
├── public/
├── src/
│   ├── components/
│   │   ├── UserCard.tsx         # React component for user display
│   │   ├── UserSettings.tsx     # React component for user settings
│   │   ├── ProductCard.tsx      # React component for product display
│   │   └── ShoppingCart.vue     # Vue component for cart management
│   ├── layouts/
│   │   └── Layout.astro         # Base layout component
│   ├── pages/
│   │   └── index.astro          # Main page with island components
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## How to Use This Example

### Scenario 1: [`UserCard.tsx`](/5-Fuller/astro-islands-app/src/components/UserCard.tsx)

1. Line 8: Add a new `showAvatar` prop to the UserCardProps interface:

   ```typescript
   interface UserCardProps {
     user: UserProfile;
     showActions?: boolean;
     showAvatar?: boolean;  // Add this new prop
     onEdit?: (user: UserProfile) => void;
   }
   ```

   **NES should suggest:**
   - Updating the UserCard component to use the new `showAvatar` prop
   - Adding the prop to the UserCard usage in `index.astro`
   - Updating any other places where UserCard is instantiated

2. Line 25: Modify the avatar image to use a fallback pattern:

   ```typescript
   <img 
     src={user.avatar || '/default-avatar.png'} 
     alt={user.name}
     className="w-12 h-12 rounded-full object-cover"
   />
   ```

   **NES should suggest:**
   - Similar pattern updates in UserSettings.tsx if it displays avatars
   - Updating the UserProfile interface to make avatar optional or required consistently

### Scenario 2: [`ProductCard.tsx`](/5-Fuller/astro-islands-app/src/components/ProductCard.tsx)

1. Line 6: Add a new `compact` prop to change the display style:

   ```typescript
   interface ProductCardProps {
     product: ProductData;
     onAddToCart?: (item: CartItem) => void;
     showPrice?: boolean;
     compact?: boolean;  // Add this new prop
   }
   ```

   **NES should suggest:**
   - Updating the component render logic to use compact styling when `compact={true}`
   - Adding the prop to ProductCard instances in `index.astro`
   - Creating conditional CSS classes based on the compact prop

2. Line 35: Update the category color function to use an enum:

   ```typescript
   enum CategoryColors {
     ELECTRONICS = 'bg-blue-100 text-blue-800',
     CLOTHING = 'bg-green-100 text-green-800',
     DEFAULT = 'bg-gray-100 text-gray-800'
   }
   ```

   **NES should suggest:**
   - Updating the ProductData interface to use a CategoryType enum
   - Updating all references to product.category to use the enum values
   - Adding the enum to the types/index.ts file

### Scenario 3: [`ShoppingCart.vue`](/5-Fuller/astro-islands-app/src/components/ShoppingCart.vue)

1. Line 42: Add a new `currency` prop to the Vue component:

   ```typescript
   interface Props {
     items: CartItem[];
     currency?: string;  // Add this new prop
     onRemoveItem?: (productId: string) => void;
     onCheckout?: () => void;
   }
   ```

   **NES should suggest:**
   - Updating the price display template to use the currency prop
   - Adding the currency prop to ShoppingCart usage in `index.astro`
   - Updating the totalPrice computed property to format with the currency

2. Line 60: Modify the totalPrice calculation to use actual product prices:

   ```typescript
   const totalPrice = computed(() => {
     return cartItems.value.reduce((sum, item) => {
       // Get actual product price instead of hardcoded 29.99
       const product = getProductById(item.productId);
       return sum + (item.quantity * (product?.price || 0));
     }, 0);
   });
   ```

   **NES should suggest:**
   - Adding a `getProductById` function or prop to access product data
   - Updating the CartItem interface to optionally include price data
   - Making similar updates in ProductCard.tsx if it calculates totals

### Scenario 4: [`types/index.ts`](/5-Fuller/astro-islands-app/src/types/index.ts)

1. Line 13: Add a new `role` field to the UserProfile interface:

   ```typescript
   export interface UserProfile {
     id: string;
     name: string;
     email: string;
     role: 'admin' | 'user' | 'moderator';  // Add this new field
     avatar?: string;
     preferences: {
       theme: 'light' | 'dark';
       notifications: boolean;
       language: string;
     };
   }
   ```

   **NES should suggest:**
   - Updating UserCard.tsx to display or handle the role field
   - Updating UserSettings.tsx to allow role editing (if appropriate)
   - Adding role-based conditional rendering in components
   - Updating mock data in `index.astro` to include the role field

2. Line 17: Add a new `rating` field to ProductData:

   ```typescript
   export interface ProductData {
     id: string;
     title: string;
     description: string;
     price: number;
     rating: number;  // Add this new field (0-5 stars)
     category: string;
     inStock: boolean;
     tags: string[];
   }
   ```

   **NES should suggest:**
   - Updating ProductCard.tsx to display the rating
   - Adding star rating UI components
   - Updating sample data in `index.astro` to include ratings
   - Adding rating-based sorting/filtering if applicable

## Island Architecture Benefits for NES

This example showcases how NES can be particularly powerful in Astro's island architecture:

1. **Cross-Framework Consistency**: When you update shared interfaces, NES can suggest updates across React and Vue components
2. **Prop Propagation**: Changes to component props can trigger suggestions for all island instances 
3. **Type Safety**: TypeScript interfaces ensure that prop changes are consistently applied across all islands
4. **Hydration Strategies**: Different hydration strategies (load, idle, visible) don't affect NES's ability to track prop relationships

## Running the Demo

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:4321`

4. Try the scenarios above to see NES in action!

## Key Features Demonstrated

- **Multi-framework islands** (React + Vue)
- **Shared TypeScript interfaces**
- **Component prop consistency**
- **Cross-island data flow**
- **Hydration strategy independence**