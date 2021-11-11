interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}
type dynamicTyping<Type = any> = {
  [Property in keyof Type]: Type[Property];
};
interface dispatchType<T, K> {
  type: T;
  data: K;
}
