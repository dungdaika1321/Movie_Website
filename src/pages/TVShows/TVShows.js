import { motion } from 'framer-motion'
import { useEffect } from 'react'

import Header from '~/layouts/common/Header'
import Categories from '~/components/Category/Categories'
import Banner from '~/layouts/common/Banner'
import requests from '~/service/requests'
import Footer from '~/layouts/common/Footer'




function TvShows({ title, setShowModal }) {


  //change title with_genres
  useEffect(() => {
    document.title = `TvShows - Netflix`
  }, [title])
  
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
     <Header/>
      <Banner
        fetchBannerData={requests.fetchComedyMovies}
        setShowModal={setShowModal}
        type="movies"
      />
      <Categories
        fetchCategories={requests.fetchTVShowGenres}
        type="movies"
      />
      <Footer/>
      
    </motion.div>
  )
}

export default TvShows
