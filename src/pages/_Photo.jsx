import { ItemPhoto } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

function _Photo() {
  const masonryItems = samplePhotos.map(photo => (
    <MasonryItem key={photo.id} height={photo.height}>
      <ItemPhoto photo={photo} />
    </MasonryItem>
  ));
  return (
    <Main>
      <Masonry>{masonryItems}</Masonry>
    </Main>
  );
}

export default _Photo;