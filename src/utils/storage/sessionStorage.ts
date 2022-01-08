class SessionStorage<T> {
  readonly sessionStorage: Storage;
  constructor() {
    this.sessionStorage = window.sessionStorage;
  }
  public getItem(key: string) {
    const getVal = this.sessionStorage.getItem(key) || '{}';
    if (getVal) {
      if (typeof JSON.parse(getVal) === 'object') {
        return JSON.parse(getVal) || '{}';
      } else {
        return getVal;
      }
    } else {
      return null;
    }
  }
  public setItem(key: string, val: any) {
    this.sessionStorage.setItem(key, JSON.stringify(val));
  }
  public removeItem(key: string) {
    this.sessionStorage.removeItem(key);
  }
  public clear() {
    this.sessionStorage.clear();
  }
}

export default new SessionStorage();
