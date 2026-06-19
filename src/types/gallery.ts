export interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string | null;
  isActive: boolean;
  displayOrder: number;
}
