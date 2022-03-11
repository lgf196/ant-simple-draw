import React, { memo, FC } from 'react';
import style from './index.module.scss';
export interface datasetType {
  dataset: {
    id: string;
  };
}
const DragTarget: FC<{ list: templateDataType[]; category: string }> = memo(function DragTarget({
  list,
  category,
}) {
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.dataTransfer.setData('id', (e.target as unknown as datasetType).dataset.id);
  };
  return (
    <div className={style.tabContent} onDragStart={handleDragStart}>
      {list &&
        list.map((item, index) => (
          <div className={style.list} key={index} data-id={item.id} draggable>
            <img src={item.icon} alt={item.label} data-id={item.id} />
            <p data-id={item.id}>{item.label}</p>
          </div>
        ))}
    </div>
  );
});

export default DragTarget;
