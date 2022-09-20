import { NavLink } from 'react-router-dom';
import { routes } from '../helpers';
import style from './css/headerTabs.module.scss';

function _HeaderTabs() {
  function getNavClass(navLinkProps) {
    let navClass = style.item;
    if (navLinkProps.isActive) navClass += ` ${style.itemSelected}`;
    return navClass;
  }

  function onLinkClick() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }

  const tabElements = routes.map(route => {
    const { id, url, title } = route;
    return (
      <NavLink key={id} to={url} className={getNavClass} end onClick={onLinkClick}>
        {title}
      </NavLink>
    );
  });

  return (
    <header className={style.main}>
      <span className={style.border}></span>
      <div className={style.scrollArea}>
        <div className={style.items}>{tabElements}</div>
      </div>
    </header>
  );
}

export default _HeaderTabs;
