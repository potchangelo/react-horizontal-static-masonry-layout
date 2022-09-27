import style from './css/itemPhoto.module.scss';

/**
 * @param {object} props
 * @param {{ title: string, photoUrl: string, width: number, height: number }} props.photo
 * @param {string} [props.extraClass]
 */
function _ItemPhoto(props) {
  const {
    photo: { title, photoUrl },
    extraClass,
  } = props;

  let mainClass = `${style.main} is-relative has-background-light`;
  if (!!extraClass) mainClass += ` ${extraClass}`;

  return (
    <div className={mainClass} style={{ height: '100%' }}>
      <img className={style.image} src={photoUrl} alt={title} />
    </div>
  );
}

export default _ItemPhoto;
