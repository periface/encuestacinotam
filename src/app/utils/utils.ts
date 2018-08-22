export class Utils {
  static snapshotToArray<T>(snapshot): Array<T> {
    const returnArr: Array<T> = [];
    snapshot.forEach(childSnapshot => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  }
}
