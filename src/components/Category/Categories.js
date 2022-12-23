import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Categories.module.scss';
import { motion } from 'framer-motion';
import { GenreContext } from '~/context/GenreContext'
import * as httpRequest from '~/utils/httpRequest';


const cx = classNames.bind(styles);

function Categories({ type, fetchCategories }) {
    const [categories, setCategories] = useState([]);
    const genreIds = useContext(GenreContext)


    //get genres list
    useEffect(() => {
        async function fetchData() {
            try {
                const requestCate = await httpRequest.get(fetchCategories)
                setCategories(requestCate.genres)
                return requestCate;
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [fetchCategories])

    //filter genre --> transfer data to Row Component
    const genreSelect = useContext(GenreContext)


    //TvShows
    const handleCategorySelected = () => {
        genreSelect.setSelectedGenre("");
        genreSelect.setCateBannerChange(false)
    }

    const handleGenreChange = ({
        target: {
            selectedOptions: [{
                dataset: { name, value }
            }]
        }
    }) => {
        genreSelect.setCateName(name)
        genreSelect.setSelectedGenre(value);
        genreSelect.setCateBannerChange(true);
    }

    //Movies
    const handleCategoryMovieSelected = () => {
        genreSelect.setSelectedMovieGenre("");
        genreSelect.setCateBannerMoviesChange(false)
    }

    const handleGenreMovieChange = ({
        target: {
            selectedOptions: [{
                dataset: { name, value }
            }]
        }
    }) => {
        genreSelect.setCateMoviesName(name)
        genreSelect.setSelectedMovieGenre(value);
        genreSelect.setCateBannerMoviesChange(true)

    }
    // hadle change title when select genre, no genre selected --> default title

    const handleTitleChange = () => {
        if (type === "tvShows") {
            if (genreSelect.cateBannerChange === false) {
                document.title = `TV Shows - Netflix`
            } else {
                document.title = `${genreSelect.cateName} - Netflix`
            }
        } else if (type === "movies") {
            if (genreSelect.cateBannerMoviesChange === false) {
                document.title = `Movies - Netflix`
            } else {
                document.title = `${genreSelect.cateMoviesName} - Netflix`
            }
        }
    }


    useEffect(() => {
        handleTitleChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreSelect.cateName, genreSelect.cateMoviesName])

    return (
        <div>
            {type && (
                <motion.div className={cx('banner_categories')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {/* TV Shows */}
                    {type === "tvShows" && (genreSelect.cateBannerChange === false
                        ? <span>
                            TV Shows
                        </span>
                        : <motion.span className={cx('selected_category')}
                            onClick={() => handleCategorySelected()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            TV Shows
                        </motion.span>)}


                    {type === "tvShows" && (genreSelect.cateBannerChange === false
                        ? <select name="genres" id="genres" value={genreIds.selectedGenre} onChange={handleGenreChange}>
                            <option style={{ display: "none" }} value={" "}>Genres</option>
                            {categories && categories.map(category => (
                                <option key={category.id} data-name={category.name} data-value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        : <motion.span className={cx('selected_genre')}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {genreSelect.cateName}
                        </motion.span>)}

                    {/* Movies */}
                    {type === "movies" && (genreSelect.cateBannerMoviesChange === false
                        ? <span>
                            Movies
                        </span>
                        : <motion.span className={cx('selected_category')}
                            onClick={() => handleCategoryMovieSelected()}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Movies
                        </motion.span>)}

                    {type === "movies" && (genreSelect.cateBannerMoviesChange === false
                        ? <select name="genres" id="genres" value={genreIds.selectedMovieGenre} onChange={handleGenreMovieChange}>
                            <option style={{ display: "none" }} value={" "}>Genres</option>
                            {categories && categories.map(category => (
                                <option key={category.id} data-name={category.name} data-value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        : <motion.span className={cx('selected_genre')}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {genreSelect.cateMoviesName}
                        </motion.span>)}
                </motion.div>
            )}
        </div>
    )
}

export default Categories