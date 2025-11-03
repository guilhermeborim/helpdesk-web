export type StatusType = "ABERTO" | "EM_ATENDIMENTO" | "ENCERRADO";

export type Call = {
  name: string;
  description: string;
  updatedAt: string;
  status: StatusType;
  servicePrice: number;
  id: string;
  client: {
    name: string;
  };
  technician: {
    name: string;
  };
};

export interface CallResponse {
  calls: Call[];
}
