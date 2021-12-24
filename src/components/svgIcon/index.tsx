import React, { memo, useMemo } from 'react';
export type svgProps = {
  iconClass: string;
  fill?: string;
  fontSize?: string;
} & React.DOMAttributes<HTMLSpanElement> &
  React.HTMLAttributes<HTMLSpanElement>;

const SvgIcon: React.FC<svgProps> = memo(function SvgIcon({
  iconClass,
  fill,
  fontSize = '18px',
  ...props
}) {
  const iconName = useMemo(() => '#icon-' + iconClass, [iconClass]);
  return (
    <span {...props}>
      <svg fontSize={fontSize!} style={{ ...svgStyle, fontSize }} aria-hidden="true">
        <use xlinkHref={iconName} fill={fill!} />
      </svg>
    </span>
  );
});

const svgStyle = {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  overflow: 'hidden',
  fill: 'currentColor', // 颜色值
  fontSize: '1.1em',
};

export default SvgIcon;
