/**
 * @param {object} props
 * @param {number} props.height
 * @param {import("react").CSSProperties} props.itemStyle
 */
function _MasonryItem(props) {
  const { children } = props;
  return (
    <div data-testid="masonry-item">
      <div>{children}</div>
    </div>
  );
}

export default _MasonryItem;
