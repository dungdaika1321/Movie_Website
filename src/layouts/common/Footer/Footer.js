import { memo } from 'react'
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const cx = classNames.bind(styles);

function Footer() {

    const links = ['Audio and Subtiles', 'Help Center', 'Gift Cards', 'Media Center', 'Investor Relations', 'Jobs', 'Terms of Use', 'Privacy', 'Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us'];

    return (

        <div className={cx('footer-container')}>
            <div className={cx('footer-inner')}>
                <div className={cx('footer-socialLink')}>
                    <FacebookRoundedIcon sx={{ marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw' }} className={cx('footer-socialLink__item')} />
                    <InstagramIcon sx={{ marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw' }} className={cx('footer-socialLink__item')} />
                    <TwitterIcon sx={{ marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw' }} className={cx('footer-socialLink__item')} />
                    <YouTubeIcon sx={{ marginLeft: '1.6vw', color: '#fff', marginRight: '0.6vw', cursor: 'pointer', fontSize: '1.8vw' }} className={cx('footer-socialLink__item')} />
                </div>

                <div className={cx('footer-contents')}>
                    <ul className={cx('content-list')}>
                        {links.map(item => (
                            <li
                                key={item}
                                className={cx('content-item')}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <button className={cx('footer-service-btn')}>
                    Service Code
                </button>

                <div className={cx('footer-copyRight')}>
                    @  Copy-Right by <a href="https://github.com/ngdung1321" target="_blank" rel="noreferrer" >Nguyen Duc Dung</a>
                </div>
            </div>
        </div>


    )
}

export default memo(Footer)
