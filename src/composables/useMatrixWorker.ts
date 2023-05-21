import type { MaybeRef } from "vue";

import { ref, inject, watch } from "vue";
import { matrixWorkerKey } from "@/injectionKeys";

export const useMatrixWorker = (_a: MaybeRef<number[][]>, _b: MaybeRef<number[][]>) => {
  const a = ref(_a);
  const b = ref(_b);

  const result = ref<number[][] | null>(null);
  const fetching = ref(false);

  const matrixWorker = inject(matrixWorkerKey);

  watch(
    [a, b],
    async () => {
      fetching.value = true;

      if (matrixWorker) {
        const rawA = JSON.parse(JSON.stringify(a.value));
        const rawB = JSON.parse(JSON.stringify(b.value));

        result.value = await matrixWorker.multiplyMatricesAsync(rawA, rawB);
      } else {
        throw new DOMException(
          "Worker is not defined. Check that you have properly installed the worker plugin."
        );
      }

      fetching.value = false;
    },
    { immediate: true }
  );

  return {
    result,
    fetching
  };
};
