import style from './css/itemPhoto.module.scss';

/**
 * @param {object} props
 * @param {{ title: string, description: string, photoUrl: string, width: number, height: number }} props.photo
 * @param {string} [props.extraClass]
 * @param {'contain'|'cover'} [props.imageObjectFit='contain']
 * @param {boolean} [props.hasText]
 */
function _ItemPhoto(props) {
  const {
    photo: { title, description, photoUrl },
    extraClass, imageObjectFit = 'contain', hasText = false
  } = props;

  let mainClass = style.main;
  let imageClass = style.image;
  let textElement = null;
  if (!!extraClass) mainClass += ` ${extraClass}`;
  if (imageObjectFit === 'cover') {
    imageClass += ` ${style.imageObjectFitCover}`;
  }
  if (hasText) {
    imageClass += ` ${style.imageBottomSpace}`;
    textElement = (
      <div className={style.textBlock}>
        <p className="is-size-7 mb-1">{title}</p>
        <p className="is-size-7 has-text-grey">{description}</p>
      </div>
    );
  }

  return (
    <div className={mainClass}>
      <img className={imageClass} src={photoUrl} alt={title} />
      {textElement}
    </div>
  );
}

export default _ItemPhoto;
