import { ItemPhoto } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

function _PhotosText() {
  const masonryItems = samplePhotos.map(photo => (
    <MasonryItem key={photo.id} width={photo.width} height={photo.height}>
      <ItemPhoto photo={photo} hasText />
    </MasonryItem>
  ));
  return (
    <Main>
      <Masonry itemHeight={266} gap={20} outerGap={20}>{masonryItems}</Masonry>
    </Main>
  );
}

export default _PhotosText;
