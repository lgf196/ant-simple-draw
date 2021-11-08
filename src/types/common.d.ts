type dynamicTyping<Type = any> = {
  [Property in keyof Type]: Type[Property];
};
