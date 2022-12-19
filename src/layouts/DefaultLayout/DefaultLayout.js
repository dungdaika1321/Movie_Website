import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/common/Header';


import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

// DefaultLayout is a layout component that wraps all the pages
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <main className={cx('main')}>
                <div className={cx('content')}>{children}</div>
            </main>

        </div>
    );
}
export default DefaultLayout;

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
