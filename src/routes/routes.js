import config from '~/config';



//pages
import Home from '~/pages/Home';
import TVShows from '~/pages/TVShows';
import Movies from '~/pages/Movies';


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.tvshows, component: TVShows },
    { path: config.routes.movies, component: Movies },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
