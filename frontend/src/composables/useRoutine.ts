import useFirebase from './useFirebase';
const { getFireStore } = useFirebase();

export default function useRoutine() {
  const fireStore = getFireStore();
  const routineRef = fireStore.collection('routines');

  async function getAll(): Promise<Routine[]> {
    const routines = await routineRef.get();
    return routines.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Routine)
    );
  }

  async function queryByDays(day: dayNumber): Promise<Routine[]> {
    console.log(routineRef);
    const routines = await routineRef
      .where('weekdays', 'array-contains', day)
      .get();
    return routines.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Routine)
    );
  }

  async function remove(id: string): Promise<void> {
    const docReference = fireStore.doc(`routines/${id}`);
    await docReference.delete();
  }

  async function get(id: string): Promise<Routine | null> {
    const routine = await routineRef.doc(id).get();
    if (!routine.exists) {
      return null;
    }
    return {
      ...routine.data(),
      id: routine.id,
    } as Routine;
  }

  function update(id: string, data: Partial<Routine>) {
    const docReference = fireStore.doc(`routines/${id}`);
    docReference.update(data);
  }

  return {
    get,
    getAll,
    remove,
    update,
    queryByDays,
  };
}
