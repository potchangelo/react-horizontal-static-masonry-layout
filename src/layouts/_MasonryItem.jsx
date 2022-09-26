/**
 * @param {object} props
 * @param {number} props.width
 * @param {number} props.height
 * @param {import("react").CSSProperties} props.itemStyle
 */
function _MasonryItem(props) {
  const { itemStyle, children } = props;
  return (
    <div className="masonry-item" data-testid="masonry-item" style={itemStyle}>
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </div>
  );
}

export default _MasonryItem;
