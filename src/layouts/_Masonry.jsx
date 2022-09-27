import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { MasonryItem } from '.';
import style from './css/masonry.module.scss';

const itemHeight = 220;

/**
 * Masonry layout by flexbox
 * @param {object} props
 * @param {number} [props.gap]
 * @param {import('react').ReactElement|import('react').ReactElement[]} [props.children]
 */
function _Masonry(props) {
  // - Data
  const { gap = 10, children } = props;
  const [layoutWidth, setLayoutWidth] = useState(window?.innerWidth ?? 0);
  const masonryRef = useRef();

  function onResize() {
    if (!!masonryRef.current) {
      setLayoutWidth(masonryRef.current.offsetWidth);
    }
  }

  // - Effect
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  // - Arrtibutes
  // 1. Items widths (style)
  let rowItemsWidths = [];
  let itemsWidths = [];
  children.forEach(child => {
    const { width, height } = child.props;
    const itemWidth = width / height * itemHeight;
    const sumRowItemsWidths = rowItemsWidths.reduce((sum, w) => sum + w, 0);

    // Has remains space : append item
    if (sumRowItemsWidths + itemWidth <= layoutWidth) {
      rowItemsWidths.push(itemWidth);
      return;
    }

    // Has remains threshold space : append item, calculate, start new empty row
    const remainsWidth = layoutWidth - sumRowItemsWidths;
    if (remainsWidth / itemWidth >= 0.45) {
      rowItemsWidths.push(itemWidth);
      const updatedSumRowItemsWidths = rowItemsWidths.reduce((sum, w) => sum + w, 0);
      const adjustedRowItemsWidths = rowItemsWidths.map((width, index) => {
        const adjustedWidth = width / updatedSumRowItemsWidths * layoutWidth;
        if (index == 0) {
          return adjustedWidth - 0.2;
        }
        return adjustedWidth;
      });
      itemsWidths.push(...adjustedRowItemsWidths);
      rowItemsWidths = [];
      return;
    }

    // No remains threshold space : calculate, start new row with current item
    const adjustedRowItemsWidths = rowItemsWidths.map((width, index) => {
      const adjustedWidth = width / sumRowItemsWidths * layoutWidth;
      if (index == 0) {
        return adjustedWidth - 0.2;
      }
      return adjustedWidth;
    });
    itemsWidths.push(...adjustedRowItemsWidths);
    rowItemsWidths = [itemWidth];
  });
  // Fill remains
  if (rowItemsWidths.length > 0) {
    itemsWidths.push(...rowItemsWidths);
  }

  // 2. Gap
  const layoutStyle = {
    marginTop: `-${gap / 2}px`,
    marginLeft: `-${gap / 2}px`,
    marginRight: `-${gap / 2}px`,
  };

  // - Elements
  let childElements = null;
  childElements = children.map((child, index) => {
    const itemWidth = itemsWidths[index];
    const itemStyle = {
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
      padding: `${gap / 2}px`
    };
    return React.cloneElement(child, {
      key: `masonry_item_${index}`,
      itemStyle
    });
  });

  return (
    <div className="masonry-container">
      <div className={style.layout} ref={masonryRef} style={layoutStyle}>
        {childElements}
      </div>
    </div>
  );
}

export default _Masonry;
