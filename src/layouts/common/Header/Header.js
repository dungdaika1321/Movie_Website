import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import images from '~/assets/images';
import config from '~/config';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
function Header() {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setScroll(true)
            } else {
                setScroll(false)
            }

        });
        return () => window.removeEventListener("scroll", () => { });
    }, []);



    return (
        <motion.div className={cx(scroll ? 'scrolled' : 'wrapper')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={cx('inner')}>



                <div className={cx('navbar__left')}>

                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="" className={cx('logo-link__img')} />
                    </Link>

                    <div className={cx('nav-item')}>
                        <NavLink to={config.routes.home} className={(nav) => cx('nav-item__link', { active: nav.isActive })} exact>
                            Home
                        </NavLink>
                    </div>
                    <div className={cx('nav-item')}>
                        <NavLink to={config.routes.tvshows} className={(nav) => cx('nav-item__link', { active: nav.isActive })}>
                            TV Shows
                        </NavLink>
                    </div>
                    <div className={cx('nav-item')}>
                        <NavLink to={config.routes.movies} className={(nav) => cx('nav-item__link', { active: nav.isActive })}>
                            Movies
                        </NavLink>
                    </div>


                </div>
                <div className={cx('navbar__right')}>
                    <SearchIcon className={cx('navbar-icon')} />

                    <NotificationsIcon className={cx('navbar-icon')} />

                    <div className={cx('user-section')}>
                        <img src={images.userAvatar} className={cx('user-avatar')} alt='' />
                        <ArrowDropDownIcon className={cx('arrow-icon')} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Header;