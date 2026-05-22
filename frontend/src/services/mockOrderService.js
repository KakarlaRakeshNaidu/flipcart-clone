// ============================================================================
// SWAP FOR REAL API HERE:
// To integrate with the real backend, replace the functions below with Axios
// or fetch calls to your API endpoints (e.g., GET /api/orders).
// Example:
// export const getOrders = async () => {
//   const response = await fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` }});
//   return response.json();
// };
// ============================================================================

const mockOrders = [
  {
    orderId: 'OD123456789012345001',
    placedAt: '2023-10-25T10:30:00Z',
    status: 'delivered',
    expectedDelivery: '2023-10-28T18:00:00Z',
    deliveredAt: '2023-10-28T14:45:00Z',
    items: [
      {
        productId: 'p1',
        name: 'APPLE iPhone 14 (Blue, 128 GB)',
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70',
        qty: 1,
        price: 57999,
        mrp: 69900,
        variant: 'Blue, 128 GB',
        seller: 'SuperComNet',
      }
    ],
    shippingAddress: {
      name: 'Rakesh Naidu',
      phone: '9876543210',
      addressLine1: 'Flat 401, Tech Park View, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560066'
    },
    payment: {
      method: 'UPI',
      transactionId: 'TXN123456789',
      paidAmount: 57999
    },
    tracking: {
      courier: 'Ekart Logistics',
      trackingId: 'FMPC123456789',
      steps: [
        { label: 'Order Confirmed', timestamp: '2023-10-25T10:30:00Z', done: true },
        { label: 'Shipped', timestamp: '2023-10-26T09:15:00Z', done: true },
        { label: 'Out for Delivery', timestamp: '2023-10-28T08:30:00Z', done: true },
        { label: 'Delivered', timestamp: '2023-10-28T14:45:00Z', done: true },
      ]
    },
    canReturn: false,
    canCancel: false
  },
  {
    orderId: 'OD123456789012345002',
    placedAt: '2024-05-20T14:20:00Z',
    status: 'shipped',
    expectedDelivery: '2024-05-25T21:00:00Z',
    deliveredAt: null,
    items: [
      {
        productId: 'p2',
        name: 'SAMSUNG Galaxy Watch 4 (44mm, Black)',
        image: 'https://m.media-amazon.com/images/I/71gMzEg9qKL._SX679_.jpg',
        qty: 1,
        price: 11999,
        mrp: 29999,
        variant: 'Black Strap, Regular',
        seller: 'RetailNet',
      }
    ],
    shippingAddress: {
      name: 'Rakesh Naidu',
      phone: '9876543210',
      addressLine1: 'Flat 401, Tech Park View, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560066'
    },
    payment: {
      method: 'Credit Card',
      transactionId: 'TXN987654321',
      paidAmount: 11999
    },
    tracking: {
      courier: 'Delhivery',
      trackingId: 'DLV987654321',
      steps: [
        { label: 'Order Confirmed', timestamp: '2024-05-20T14:20:00Z', done: true },
        { label: 'Shipped', timestamp: '2024-05-21T11:00:00Z', done: true },
        { label: 'Out for Delivery', timestamp: null, done: false },
        { label: 'Delivered', timestamp: null, done: false },
      ]
    },
    canReturn: false,
    canCancel: true
  },
  {
    orderId: 'OD123456789012345003',
    placedAt: '2024-05-22T08:10:00Z',
    status: 'confirmed',
    expectedDelivery: '2024-05-28T21:00:00Z',
    deliveredAt: null,
    items: [
      {
        productId: 'p3',
        name: 'Sony WH-1000XM4 Bluetooth Headset',
        image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._SX679_.jpg',
        qty: 1,
        price: 19990,
        mrp: 24990,
        variant: 'Black',
        seller: 'TechStore',
      }
    ],
    shippingAddress: {
      name: 'Rakesh Naidu',
      phone: '9876543210',
      addressLine1: 'Flat 401, Tech Park View, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560066'
    },
    payment: {
      method: 'COD',
      transactionId: null,
      paidAmount: 0 // to be paid
    },
    tracking: {
      courier: null,
      trackingId: null,
      steps: [
        { label: 'Order Confirmed', timestamp: '2024-05-22T08:10:00Z', done: true },
        { label: 'Shipped', timestamp: null, done: false },
        { label: 'Out for Delivery', timestamp: null, done: false },
        { label: 'Delivered', timestamp: null, done: false },
      ]
    },
    canReturn: false,
    canCancel: true
  },
  {
    orderId: 'OD123456789012345004',
    placedAt: '2024-01-15T16:45:00Z',
    status: 'cancelled',
    expectedDelivery: null,
    deliveredAt: null,
    items: [
      {
        productId: 'p4',
        name: 'Nike Air Max 270 Running Shoes',
        image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/shoe/s/b/l/10-ah8050-002-nike-black-anthracite-white-original-imaggzt6qzzsqtpg.jpeg?q=70',
        qty: 1,
        price: 12995,
        mrp: 12995,
        variant: 'Size 10, Black',
        seller: 'Nike India',
      }
    ],
    shippingAddress: {
      name: 'Rakesh Naidu',
      phone: '9876543210',
      addressLine1: 'Flat 401, Tech Park View, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pin: '560066'
    },
    payment: {
      method: 'Debit Card',
      transactionId: 'TXN112233445',
      paidAmount: 12995
    },
    tracking: {
      courier: null,
      trackingId: null,
      steps: [
        { label: 'Order Confirmed', timestamp: '2024-01-15T16:45:00Z', done: true },
        { label: 'Cancelled', timestamp: '2024-01-16T10:00:00Z', done: true },
      ]
    },
    canReturn: false,
    canCancel: false
  }
];

export const getOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 300);
  });
};

export const getOrderById = async (orderId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = mockOrders.find(o => o.orderId === orderId);
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 300);
  });
};
