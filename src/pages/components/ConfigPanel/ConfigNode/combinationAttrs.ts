export const defaultCombinationGraphicsAttrs = {
  titleText: '',
  titlefontSize: 12,
  titleFill: '',
  textText: '',
  textfontSize: 12,
  textFill: '',
};

export interface combinationAttrs<T = string, K = number> {
  titleText: T;
  titlefontSize: K;
  titleFill: T;
  textText: T;
  textfontSize: K;
  textFill: T;
}

export enum combinationAttrsPath {
  titleText = 'title/text',
  titlefontSize = 'title/fontSize',
  titleFill = 'title/fill',
  textText = 'text/text',
  textfontSize = 'text/fontSize',
  textFill = 'text/fill',
}
