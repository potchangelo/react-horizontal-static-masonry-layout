import { ItemPhoto } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

function _PhotosCover() {
  const masonryItems = samplePhotos.map(photo => (
    <MasonryItem key={photo.id} width={photo.width} height={photo.height}>
      <ItemPhoto photo={photo} imageObjectFit="cover" />
    </MasonryItem>
  ));
  return (
    <Main>
      <Masonry itemHeight={200} gap={20} outerGap={20}>
        {masonryItems}
      </Masonry>
    </Main>
  );
}

export default _PhotosCover;
