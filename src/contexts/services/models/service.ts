export type Service = {
  name: string;
  price: number;
  active: boolean;
  id: string;
};

export interface ServiceResponse {
  services: Service[];
}
