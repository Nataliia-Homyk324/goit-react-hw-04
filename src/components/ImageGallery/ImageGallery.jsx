import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items, openModal }) {
  const imageClick = event => {
    const imgItem = event.target.closest('li');
    if (imgItem) {
      const imgID = imgItem.dataset.id;
      const clickedImageItem = items.find(image => image.id === imgID);
      if (clickedImageItem) {
        openModal(clickedImageItem);
      }
    }
  };

  return (
    <section className={css.containerGallery}>
      <ul className={css.gallery} onClick={imageClick}>
        {items.map(item => (
          <li className={css.galleryItem} key={item.id} data-id={item.id}>
            <ImageCard imageItem={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
