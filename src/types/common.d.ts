interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}
type dynamicTyping<Type = any> = {
  [Property in keyof Type]: Type[Property];
};
interface dispatchType<T, K = unknown> {
  type: T;
  data?: K;
}
interface MergeEvent extends React.MouseEvent {
  target: HTMLElement;
}
interface xyTYpe<T = number> {
  x: T;
  y: T;
}
interface MergeCSSProperties extends React.CSSProperties {
  // 这里要将rotate的类型给重置掉，方便后面对rotate进行操作
  rotate?: any;
}
