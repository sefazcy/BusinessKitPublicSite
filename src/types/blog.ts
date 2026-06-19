export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  coverImageUrl: string | null;
  category: string | null;
  language: string;
  isPublished: boolean;
  publishedAt: string | null;
}
