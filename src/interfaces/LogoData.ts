export interface LogoData {
  name: string|null;
  price: {
    amount: number|null;
    currency: string|null;
  },
  country?: string;
}
