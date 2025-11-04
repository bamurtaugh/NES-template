<!-- NES Demo: Try edits from README Scenario 3 to see Next Edit Suggestions in action -->

<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Shopping Cart</h2>
      <button 
        @click="toggleExpanded"
        class="text-blue-500 hover:text-blue-600"
      >
        {{ isExpanded ? 'Hide' : 'Show' }} Details
      </button>
    </div>

    <div class="mb-4">
      <p class="text-gray-600">Items: {{ totalItems }}</p>
      <p class="text-xl font-bold">Total: ${{ totalPrice.toFixed(2) }}</p>
    </div>

    <div v-if="isExpanded" class="space-y-2">
      <div 
        v-for="item in cartItems" 
        :key="item.productId"
        class="flex justify-between items-center p-2 border-b"
      >
        <span>Product {{ item.productId }}</span>
        <div class="flex items-center space-x-2">
          <span>Qty: {{ item.quantity }}</span>
          <button 
            @click="removeItem(item.productId)"
            class="text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="cartItems.length > 0"
      @click="checkout"
      class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
    >
      Checkout
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  removeItem: [productId: string];
  checkout: [];
}>();

const isExpanded = ref(false);

const cartItems = computed(() => props.items);

const totalItems = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const totalPrice = computed(() => {
  // In a real app, you'd calculate this based on product prices
  return cartItems.value.reduce((sum, item) => sum + (item.quantity * 29.99), 0);
});

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const removeItem = (productId: string) => {
  emit('removeItem', productId);
  if (props.onRemoveItem) {
    props.onRemoveItem(productId);
  }
};

const checkout = () => {
  emit('checkout');
  if (props.onCheckout) {
    props.onCheckout();
  }
};
</script>