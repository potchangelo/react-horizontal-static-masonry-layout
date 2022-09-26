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
  const masonryRef = useRef();

  function onResize() {
    if (!!masonryRef.current) {
      console.log(masonryRef.current.offsetWidth);
      // TODO : Calculate masonry item
    }
  }

  // - Effect
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  // - Elements
  let childElements = null;
  // console.log(children);
  const childrenCopy = children.map((child, index) => {
    const { width, height } = child.props;
    const itemWidth = width / height * itemHeight;
    console.log(itemWidth);
    const itemStyle = {
      width: `${itemWidth}px`
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
