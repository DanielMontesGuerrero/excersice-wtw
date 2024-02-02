export enum ExecutionTypes {
  Simple = "simple",
  Complex = "complex",
}

export interface ActuarialModelPayload {
  mainLimit: number;
  mainRetention: number;
  executionType: ExecutionTypes;
}

interface resultItem {
  date: Date;
  benchmarks: number[];
}

export interface ActuarialModelCalculationResponse {
  results: resultItem[];
}
