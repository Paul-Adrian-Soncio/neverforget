export interface Polaroid {
  id: string;
  imageDataUrl: string;
  filterId: string;
  title: string;
  date: string;
  note: string;
  createdAt: number;
}

export type NewPolaroid = Omit<Polaroid, "id" | "createdAt">;
