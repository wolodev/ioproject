/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from 'vue';
import { debounce } from 'lodash';

export function usePropsModel(
  props: any,
  emit: any,
  name = 'modelValue',
  debounceTime = 0
) {
  let callback = emit;
  if (debounceTime) {
    callback = debounce(emit, debounceTime);
  }
  return computed({
    get: () => props[name],
    set: (value) => callback(`update:${name}`, value),
  });
}
