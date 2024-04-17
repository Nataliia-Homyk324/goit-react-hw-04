import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ items }) {
  return (
    <section className={css.containerGallery}>
      <ul className={css.gallery}>
        {items.map(item => (
          <li className={css.galleryItem} key={item.id}>
            <ImageCard imageItem={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
