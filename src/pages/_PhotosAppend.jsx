import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemPhoto, SectionLoadMore } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

function _PhotosAppend() {
  const [photos, setPhotos] = useState(samplePhotos);
  const [isLoading, setIsLoading] = useState(false);

  function loadMore() {
    setPhotos(prevPhotos => {
      const clonedPhotos = samplePhotos.map(p => ({ ...p, id: uuidv4() }));
      return [...prevPhotos, ...clonedPhotos];
    });
    setIsLoading(false);
  }

  function onLoadMoreClick() {
    setIsLoading(true);
    loadMore();
  }

  const masonryItems = photos.map(photo => (
    <MasonryItem key={photo.id} width={photo.width} height={photo.height}>
      <ItemPhoto photo={photo} />
    </MasonryItem>
  ));

  return (
    <Main>
      <Masonry itemHeight={200} gap={20} outerGap={20}>{masonryItems}</Masonry>
      <SectionLoadMore isShow={!isLoading} onLoadMoreClick={onLoadMoreClick} />
    </Main>
  );
}

export default _PhotosAppend;
