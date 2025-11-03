export type Tech = {
  name: string;
  email: string;
  id: string;
  availability: string[];
};

export interface TechResponse {
  user: Tech[];
}
