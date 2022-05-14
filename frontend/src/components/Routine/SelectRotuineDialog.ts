// a bit stupid implementation - but quasar seems to have some weird bug - $q is undefinied inside .ts files
// so the usage in components will be for example
// import { useQuasar } from 'quasar';
// import { createParamsForDialog, addProduct } from '../components/Routine/SelectRotuineDialog';
// const $q = useQuasar();

// async function handleAdd(id: number) {
//   $q.dialog((await createParamsForDialog())).onOk((routine: Routine) => {
//     addProduct(routine, id);
//   })
// }

import { ref } from 'vue';
import type { Ref } from 'vue';
import type { QDialogOptions } from 'quasar';
import useRoutine from 'src/composables/useRoutine';
import { omit } from 'lodash';
const { getAll, update } = useRoutine();

const routines: Ref<Routine[]> = ref([]);

export async function createParamsForDialog(): Promise<QDialogOptions> {
  routines.value = await getAll();
  const items = routines.value.map((el) => ({
    label: el.name,
    value: el,
  }));
  return {
    title: 'Add product',
    message: 'Select Routine where product will be added',
    options: {
      type: 'radio',
      model: 'opt1',
      items,
    },
    cancel: true,
  } as QDialogOptions;
}

export async function addProduct(routine: Routine, id: number): Promise<void> {
  routine.products.push(id);
  update(routine.id, {
    ...omit(routine, 'id'),
  });
}
