import style from './css/masonry.module.scss';

/**
 * @param {object} props
 * @param {number} props.width
 * @param {number} props.height
 * @param {import("react").CSSProperties} props.itemStyle
 */
function _MasonryItem(props) {
  const { itemStyle, children } = props;
  return (
    <div data-testid="masonry-item" style={itemStyle}>
      <div className={style.item}>{children}</div>
    </div>
  );
}

export default _MasonryItem;
