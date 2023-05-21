import type { InjectionKey } from "vue";

export const matrixWorkerKey: InjectionKey<{
  multiplyMatricesAsync: (a: number[][], b: number[][]) => Promise<number[][]>;
}> = Symbol("matrixWorker");
