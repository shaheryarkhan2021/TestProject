export default {
  product: {
    id: 890,
    sizes: [
      {
        id: 123, name: 'Small', abbreviation: 'S',
        colors: [
          { name: 'red', quantity: 57 },
          { name: 'black', quantity: 7 }
        ]
      },
      {
        id: 234, name: 'Medium', abbreviation: 'M',
        colors: [
          { name: 'black', quantity: 27 },
          { name: 'blue', quantity: 17 }
        ]
      },
      {
        id: 345, name: 'Large', abbreviation: 'L',
        colors: [
          { name: 'red', quantity: 8 },
          { name: 'blue', quantity: 22 }
        ]
      },
      {
        id: 456, name: 'X-Large', abbreviation: 'XL',
        colors: [
          { name: 'red', quantity: 5 },
          { name: 'orange', quantity: 2 }
        ]
      }
    ],
    colors: [
      'black', 'red', 'orange', 'blue'
    ],
    name: 'The Special Pantsuit',
    description: 'This is the coolest pantsuit you"ve ever seen. Fits like a dream. Wear this everywhere, and nowhere.',
    bullets: [
      'So baggy and yet hugs all the right places',
      'Big hidden pockets',
      'Front zipper so you can zip yourself in',
      'Silk material, reinforced stitching'
    ],
    images: [
      { order: 0, url: require('../assets/jumpsuit-1.jpg') },
      { order: 1, url: require('../assets/jumpsuit-2.jpg') },
      { order: 2, url: require('../assets/jumpsuit-3.jpg') },
      { order: 3, url: require('../assets/jumpsuit-4.jpg') },
      { order: 4, url: require('../assets/jumpsuit-5.jpg') }
    ],
    materials: ['silk'],
    price: 12000,
    sizeInfo: 'These are sized a little small. We advise ordering the next size up from what you normally wear.',
    materialInfo: '100% silk which feels very nice. These are meant to be warn slightly baggy so that they are comfortable. Zipper front with rolled up sleeves. Hip pockets on the front.'
  },
  modal: {
    isOpen: false,
    type: '',
  },
  cart: [{quantity: 2, colorId: 'black', sizeId: 123}],
  currency: {
    symbol: '$',
    title: 'USD'
  }
}
