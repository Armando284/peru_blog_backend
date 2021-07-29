//crea un arreglo de largo 'size' y lo llena con numeros aleatorios
function createTestArray(size: number): number[] {
  const array: number[] = [];
  for (let i = size; i > 0; i--) {
    const randomValue: number = Math.round(Math.random() * size);
    array.push(randomValue);
  }
  return array;
}

const filled: number[] = createTestArray(1000000);

console.log('Arreglo desorganizado', filled);

function MergeSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  const middle: number = (arr.length / 2) | 0;
  const left: number[] = arr.slice(0, middle);
  const right: number[] = arr.slice(middle);
  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let il = 0,
      ir = 0;
    while (il < left.length && ir < right.length) {
      result.push(left[il] < right[ir] ? left[il++] : right[ir++]);
    }
    return [...result, ...left.slice(il), ...right.slice(ir)];
  };
  return merge(MergeSort(left), MergeSort(right));
}
console.log('Ordenada por merge', MergeSort(filled));
