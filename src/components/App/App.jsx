import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../images-api';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      try {
        setError(false);
        setIsLoading(true);

        const data = await fetchImages(query, page);

        setImages(prevImages => {
          return [...prevImages, ...data.results];
        });

        if (!data.total) {
          toast(
            'Sorry, we have not found the photos. ',

            {
              duration: 5000,
            }
          );
        } else {
          toast.success(`Wow! We found ${data.total} pictures`);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  console.log(images);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      <Toaster />

      {images.length > 0 && <ImageGallery items={images} />}

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && !isLoading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </div>
  );
}
