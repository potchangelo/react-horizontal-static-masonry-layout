import React, { useCallback, useEffect, useState } from 'react';
import { MasonryItem } from '.';
import style from './css/masonry.module.scss';

/**
 * Masonry layout by grid, might have scroll restoration
 * @param {object} props
 * @param {import('react').ReactElement|import('react').ReactElement[]} [props.children]
 */
function _Masonry(props) {
  // - Data
  const { children } = props;

  const onResize = useCallback(() => {

  }, []);

  // - Effect
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  // - Elements
  let childElements = null;
  console.log(children);
  const childrenCopy = children.map((child, index) => {
    return React.cloneElement(child, { key: index });
  });

  return (
    <div>
      <div className={style.layout}>
        {childrenCopy}
      </div>
    </div>
  );
}

export default _Masonry;
