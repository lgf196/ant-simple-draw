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
interface whType<T = number> {
  width: T;
  height: T;
}
interface MergeCSSProperties extends React.CSSProperties {
  // 重置CSSProperties接口以下属性
  rotate?: any;
  width?: any;
  height?: any;
  top?: any;
  right?: any;
  left?: any;
  bottom?: any;
}
