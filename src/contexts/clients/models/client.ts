export type Client = {
  name: string;
  email: string;
  id: string;
};

export interface ClientResponse {
  user: Client[];
}
