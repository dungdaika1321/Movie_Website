
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import HashLoader from 'react-spinners/HashLoader';
import Banner from '~/layouts/common/Banner';
import Footer from '~/layouts/common/Footer';
import requests from '~/service/requests';

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }

}

function Home() {

    const [loading, setLoading] = useState(false)

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
                        <Banner fetchBannerData={requests.fetchComedyMovies} />
                        <Footer />
                    </motion.div>
                )}

        </motion.div>

    )
}

export default Home;