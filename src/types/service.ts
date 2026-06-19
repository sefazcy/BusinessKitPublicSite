export interface Service {
  id: number;
  title: string;
  slug: string;
  price: number;
  durationMinutes: number;
  imageUrl: string | null;
  isActive: boolean;
  displayOrder: number;
}
