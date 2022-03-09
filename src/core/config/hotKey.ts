export type keyCodeType =
  | 'Ctrl+X'
  | 'Ctrl+C'
  | 'Ctrl+V'
  | 'Ctrl+Z'
  | 'Shift+Z'
  | 'Delete'
  | 'Shift+A'
  | 'Ctrl+Shift+Up'
  | 'Ctrl+Up'
  | 'Ctrl+Down'
  | 'Ctrl+Shift+Down'
  | 'Alt+Z';

export interface hotKeyListType {
  name: string;
  key: keyCodeType;
}

export const hotKeyList: hotKeyListType[] = [
  {
    name: '剪切',
    key: 'Ctrl+X',
  },
  {
    name: '复制',
    key: 'Ctrl+C',
  },
  {
    name: '粘贴',
    key: 'Ctrl+V',
  },
  {
    name: '撤销',
    key: 'Ctrl+Z',
  },
  {
    name: '恢复',
    key: 'Shift+Z',
  },
  {
    name: '禅模式',
    key: 'Alt+Z',
  },
  {
    name: '删除',
    key: 'Delete',
  },
  {
    name: '清屏',
    key: 'Shift+A',
  },
  {
    name: '移到顶层',
    key: 'Ctrl+Shift+Up',
  },
  {
    name: '上移一层',
    key: 'Ctrl+Up',
  },
  {
    name: '下移一层',
    key: 'Ctrl+Down',
  },
  {
    name: '移到顶层',
    key: 'Ctrl+Shift+Down',
  },
];

// 合并所有的快捷键值码
export const allKeyValueCode = hotKeyList.map((item) => item.key).join(',');
