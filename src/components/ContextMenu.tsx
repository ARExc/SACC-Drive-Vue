import style from './styles/ContextMenu.module.scss';
import React from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  show: boolean;
  onClose: () => void;
  items: Array<{ label: string; onClick: () => void }>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({x, y, show, onClose, items}) => {
  if (!show) return null;
  return (
    <div className={style.contextMenu} style={{top: y, left: x}} onClick={onClose}>
      {items.map((item, index) => (
        <div key={index} className={style.menuItem} onClick={item.onClick}>
          {item.label}
        </div>
      ))}
    </div>
  );
}
export default ContextMenu;
