export type WorkerRequest = {
  id: string;
  a: number[][];
  b: number[][];
};

export type WorkerResponse = {
  id: string;
  result: number[][];
};

addEventListener("message", (e: MessageEvent<WorkerRequest>) => {
  const response: WorkerResponse = {
    id: e.data.id,
    result: multiplyMatrices(e.data.a, e.data.b)
  };

  postMessage(response);
});

function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  const result: number[][] = new Array(a.length);

  for (let i = 0; i < a.length; i++) {
    result[i] = new Array(b[0].length);
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < a[0].length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
}
