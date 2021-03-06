export class ArrayHelper {

  public static arraysEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (a == null || b == null) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }

    // If you don't care about the order of the custom.elements inside
    // the array, you should sort both arrays here.
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  public static checkArrayIsSortedAsc(incomingArray): boolean {
    return !!incomingArray.reduce((n, item) => n !== false && item >= n && item);
  }

  public static getRandomValueFromArray(array): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  public static arrayHasTheOnlyValues(arr, val) {
    if (typeof arr !== 'undefined' && arr.length > 0) {
      return !this.arrayHasOtherValuesExcept(arr, val);
    }
  }

  public static arrayHasOtherValuesExcept(arr, val) {
    if (typeof arr !== 'undefined' && arr.length > 0) {
      return arr.some((arrVal) => val !== arrVal);
    }
  }
}
