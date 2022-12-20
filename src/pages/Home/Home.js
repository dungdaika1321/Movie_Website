
import { motion } from 'framer-motion';

import Banner from '~/layouts/common/Banner';
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
    <Banner fetchBannerData={requests.fetchComedyMovies} />
    </motion.div>

  )
}

export default Home;