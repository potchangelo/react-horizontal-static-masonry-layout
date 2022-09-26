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
  const [layoutWidth, setLayoutWidth] = useState(0);
  const masonryRef = useRef();

  function onResize() {
    if (!!masonryRef.current) {
      setLayoutWidth(masonryRef.current.offsetWidth);
    }
  }

  // - Effect
  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  // TODO : Calculate style for each masonry item
  let tempRowWidths = [];
  let itemsWidths = [];
  children.forEach(child => {
    const { width, height } = child.props;
    const itemWidth = width / height * itemHeight;
    const sumTempRowWidths = tempRowWidths.reduce((prev, current) => {
      return prev + current;
    }, 0);
    if (sumTempRowWidths + itemWidth <= layoutWidth) {
      tempRowWidths.push(itemWidth);
      return;
    }
    if (layoutWidth > 0) {
      console.log(tempRowWidths);
    }
    // TODO : Calculate percentage width
    const tempRowWidths2 = tempRowWidths.map(width => {
      return (width / sumTempRowWidths * layoutWidth) - 1;
    });
    itemsWidths.push(...tempRowWidths2);
    tempRowWidths = [];
    tempRowWidths.push(itemWidth);
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
