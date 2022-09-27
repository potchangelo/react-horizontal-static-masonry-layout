import { useState } from 'react';
import { ItemPhoto } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

function _PhotosShuffle() {
  const [photos, setPhotos] = useState(getShufflePhotos());

  function getShufflePhotos() {
    const arr = [...samplePhotos];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shufflePhotos() {
    setPhotos(getShufflePhotos());
  }

  const masonryItems = photos.map(photo => (
    <MasonryItem key={photo.id} width={photo.width} height={photo.height}>
      <ItemPhoto photo={photo} />
    </MasonryItem>
  ));

  return (
    <Main>
      <Masonry itemHeight={200} gap={20} outerGap={20}>{masonryItems}</Masonry>
      <button
        className="button is-primary"
        style={{ position: 'fixed', bottom: '12px', right: '12px', zIndex: 10000 }}
        onClick={shufflePhotos}
      >
        <b>Shuffle</b>
      </button>
    </Main>
  );
}

export default _PhotosShuffle;
