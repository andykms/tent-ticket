export const SERVICE_SEED: {
  name: string;
  description: string;
  price: number;
  requiresDetails: boolean;
}[] = [
  {
    name: 'Питание',
    description: 'Выбор блюд на борту',
    price: 500,
    requiresDetails: true,
  },
  {
    name: 'Дополнительный багаж',
    description: '+10 кг багажа',
    price: 1500,
    requiresDetails: false,
  },
  {
    name: 'Провоз животных',
    description: 'Провоз домашних животных в салоне',
    price: 3000,
    requiresDetails: true,
  },
  {
    name: 'Выбор места',
    description: 'Выбор определенного места на борту',
    price: 1000,
    requiresDetails: false,
  },
];
