/**
 * @param {object} props
 * @param {{ title: string, photoUrl: string, width: number, height: number }} props.photo
 * @param {string} [props.extraClass]
 */
function _ItemPhoto(props) {
  const {
    photo: { title, photoUrl, width, height },
    extraClass,
  } = props;

  let imageClass = 'is-relative has-background-light';
  if (!!extraClass) imageClass += ` ${extraClass}`;

  return (
    <div className={imageClass}>
      <img className="is-block" src={photoUrl} alt={title} />
    </div>
  );
}

export default _ItemPhoto;
