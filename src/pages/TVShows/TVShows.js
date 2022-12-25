import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import HashLoader from 'react-spinners/HashLoader'
import Categories from '~/components/Category/Categories'
import Row from '~/components/Row'
import Banner from '~/layouts/common/Banner'
import Footer from '~/layouts/common/Footer'
import Header from '~/layouts/common/Header'
import requests from '~/service/requests'


function TvShows({ title, setShowModal }) {

  const [loading, setLoading] = useState(false)

  //change title when change page
  useEffect(() => {
    document.title = `TV Shows - Netflix`
  }, [title])

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    }

  }
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {
        loading ?
          (
            <div className={'loading-pages'}>
              <HashLoader
                color={'#fff'}
                className={'spinner-icon'}
                size={50}
              />
            </div>
          ) :
          (
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
                fetchCategories={requests.fetchTVShowGenres}
                type="movies"
              />
              <Row
                title="TV Shows Mystery"
                fetchUrl={requests.fetchTVMystery}
                fetchGenres={requests.fetchTVShowGenres}
                setShowModal={setShowModal}
                type="tvShows"
              />
              <Row
                title="TV Shows Action"
                fetchUrl={requests.fetchTVAction}
                fetchGenres={requests.fetchTVShowGenres}
                setShowModal={setShowModal}
                type="tvShows"
              />
              <Row
                title="TV Shows Animation"
                fetchUrl={requests.fetchTVAnimation}
                fetchGenres={requests.fetchTVShowGenres}
                setShowModal={setShowModal}
                type="tvShows"
              />
              <Row
                title="TV Shows Comedy"
                fetchUrl={requests.fetchTVComedy}
                fetchGenres={requests.fetchTVShowGenres}
                setShowModal={setShowModal}
                type="tvShows"
              />
              <Footer />
            </motion.div>
          )
      }
    </motion.div>
  )
}

export default TvShows
