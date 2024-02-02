import {
  ActuarialModelPayload,
  ActuarialModelCalculationResponse,
} from "../types/ActuarialModelPayload";

export function postActuarialModelCalculation(
  payload: ActuarialModelPayload,
): ActuarialModelCalculationResponse {
  const MAX_LENGTH = 20;
  const MIN_LENGTH = 5;
  const numOfItems = Math.random() * (MAX_LENGTH - MIN_LENGTH + 1) + MIN_LENGTH;
  const results = [];
  for (let i = 0; i < numOfItems; i++) {
    // let benchmarks = new Array<number>(2);
    const benchmarks = [Math.random() * 100, Math.random() * 100];
    const item = {
      date: new Date(Date.now() + Math.random() * 100000000000),
      benchmarks,
    };
    results.push(item);
  }
  return { results };
}
