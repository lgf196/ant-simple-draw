export const defaultCombinationGraphicsAttrs = {
  titleText: '',
  titlefontSize: 12,
  titleFill: '',
  textText: '',
  textfontSize: 12,
  textFill: '',
  imageHref: [],
  imageW: 16,
  imageH: 16,
  imageX: 6,
  imageY: 6,
};

export interface combinationAttrs<T = string, K = number> {
  titleText: T;
  titlefontSize: K;
  titleFill: T;
  textText: T;
  textfontSize: K;
  textFill: T;
  imageHref: any[];
  imageW: K;
  imageH: K;
  imageX: K;
  imageY: K;
}

export enum combinationAttrsPath {
  titleText = 'title/text',
  titlefontSize = 'title/fontSize',
  titleFill = 'title/fill',
  textText = 'text/text',
  textfontSize = 'text/fontSize',
  textFill = 'text/fill',
  imageHref = 'image/xlink:href',
  imageW = 'image/width',
  imageH = 'image/height',
  imageX = 'image/x',
  imageY = 'image/y',
}
