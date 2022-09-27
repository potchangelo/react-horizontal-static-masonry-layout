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

  let imageClass = 'is-relative has-background-success';
  if (!!extraClass) imageClass += ` ${extraClass}`;

  return (
    <div className={imageClass} style={{ width: '100%', height: '100%' }}>
      <img className="is-block" src={photoUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

export default _ItemPhoto;
