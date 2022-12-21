
import { useEffect } from 'react'
import { motion } from 'framer-motion'


import Header from '~/layouts/common/Header'
import Categories from '~/components/Category/Categories'
import Banner from '~/layouts/common/Banner'
import requests from '~/service/requests'


function Movies({ title, setShowModal }) {

    //change title with_genres
    useEffect(() => {
        document.title = 'Movies - Netflix'
    }, [])

    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        }

    }

    return (

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <Header />
            <Banner
                fetchBannerData={requests.fetchComedyMovies}
                setShowModal={setShowModal}
                type="movies"
            />
            <Categories
                fetchCategories={requests.fetchMoviesGenres}
                type="movies"
            />

        </motion.div>

    )
}

export default Movies