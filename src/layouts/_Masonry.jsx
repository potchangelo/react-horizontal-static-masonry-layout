import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { MasonryItem } from '.';
import style from './css/masonry.module.scss';

const itemHeight = 220;

/**
 * Masonry layout by grid, might have scroll restoration
 * @param {object} props
 * @param {import('react').ReactElement|import('react').ReactElement[]} [props.children]
 */
function _Masonry(props) {
  // - Data
  const { children } = props;
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

  // - Style widths
  let tempRowWidths = [];
  let itemsWidths = [];
  children.forEach(child => {
    const { width, height } = child.props;
    const itemWidth = width / height * itemHeight;
    const sumTempRowWidths = tempRowWidths.reduce((prev, current) => {
      return prev + current;
    }, 0);

    // Has remains space : append item
    if (sumTempRowWidths + itemWidth <= layoutWidth) {
      tempRowWidths.push(itemWidth);
      return;
    }

    // Has remains above threshold space : append item then calculate
    const remainsWidth = layoutWidth - sumTempRowWidths;
    if (remainsWidth / itemWidth >= 0.5) {

      tempRowWidths.push(itemWidth);
      const sumTempRowWidths2 = tempRowWidths.reduce((prev, current) => {
        return prev + current;
      }, 0);
      const tempRowWidths2 = tempRowWidths.map(width => {
        return (width / sumTempRowWidths2 * layoutWidth) - 1;
      });
      itemsWidths.push(...tempRowWidths2);
      tempRowWidths = [];
      return;
    }

    // No remains space : calculate before append item
    const tempRowWidths2 = tempRowWidths.map(width => {
      return (width / sumTempRowWidths * layoutWidth) - 1;
    });
    itemsWidths.push(...tempRowWidths2);
    tempRowWidths = [itemWidth];
  });
  if (tempRowWidths.length > 0) {
    itemsWidths.push(...tempRowWidths);
  }

  // - Elements
  let childElements = null;
  const childrenCopy = children.map((child, index) => {
    const itemWidth = itemsWidths[index];
    const itemStyle = {
      width: `${itemWidth}px`,
      height: `${itemHeight}px`
    };
    return React.cloneElement(child, { itemStyle });
  });

  return (
    <div className="masonry-xxxx" ref={masonryRef}>
      <div className={style.layout}>
        {childrenCopy}
      </div>
    </div>
  );
}

export default _Masonry;
