
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import HashLoader from 'react-spinners/HashLoader';
import Banner from '~/layouts/common/Banner';
import Footer from '~/layouts/common/Footer';
import requests from '~/service/requests';
import Row from '~/components/Row';

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }

}

function Home({ title, setShowModal }) {

    const [loading, setLoading] = useState(false)

    //change title when change page
    useEffect(() => {
        document.title = `Home - Netflix`
    })

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
            {loading ?
                (
                    <div className={'loading-pages'}
                    >
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
                        <Banner fetchBannerData={requests.fetchActionMovies} />
                        <Row
                            title="Top Rated"
                            fetchUrl={requests.fetchTopRated}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"
                        />
                        <Row
                            title="Action Movies"
                            fetchUrl={requests.fetchActionMovies}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"
                        />
                        <Row
                            title="Comedy Movies"
                            fetchUrl={requests.fetchComedyMovies}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"
                        />
                        <Row
                            title="Horror Movies"
                            fetchUrl={requests.fetchHorrorMovies}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"
                        />
                        <Row
                            title= "Cartoon Movies"
                            fetchUrl={requests.fetchTVAnimation}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"

                        />
                        <Row
                            title="Romance Movies"
                            fetchUrl={requests.fetchRomanceMovies}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"
                        />
                        <Row
                            title="Documentaries"
                            fetchUrl={requests.fetchDocumentaries}
                            fetchGenres={requests.fetchMoviesGenres}
                            setShowModal={setShowModal}
                            type="movies"
                        />
                        <Footer />
                    </motion.div>
                )}

        </motion.div>

    )
}

export default Home;