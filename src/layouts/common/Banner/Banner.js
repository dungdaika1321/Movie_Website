import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import Youtube from 'react-youtube';
import { GenreContext } from '~/context/GenreContext';
import { ModalContext } from '~/context/ModalContext';
import * as httpRequest from '~/utils/httpRequest';
import styles from './Banner.module.scss';



const cx = classNames.bind(styles);

function Banner({ fetchBannerData, type }) {
    const baseUrl = process.env.REACT_APP_BASE_URL_LARGE;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState()
    const [delayUrl, setDelayUrl] = useState();
    const trailerRef = useRef(null)

    const genreIds = useContext(GenreContext)
    const bannerMId = useContext(ModalContext)


    //get movies
    useEffect(() => {
        async function fetchData() {

            //handle filter genre--> take data from banner
            try {
                var url
                if (type === "movies" || type === undefined) {
                    if (fetchBannerData.includes("%2C")) {
                        url = fetchBannerData.replace(`%2C${genreIds.selectedMovieGenre}`, "")
                    } else {
                        url = fetchBannerData.concat(`%2C${genreIds.selectedMovieGenre}`)
                    }
                } else {
                    if (fetchBannerData.includes("%2C")) {
                        url = fetchBannerData.replace(`%2C${genreIds.selectedGenre}`, "")
                    } else {
                        url = fetchBannerData.concat(`%2C${genreIds.selectedGenre}`)
                    }
                }

                const request = await httpRequest.get(url)
                //set random api movie to banner
                setMovie(request.results[
                    Math.floor(Math.random() * (request.results.length - 1))
                ])
                return request;
            } catch (error) {
                console.error(error)

            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchBannerData, genreIds.selectedGenre, genreIds.selectedMovieGenre]);

    //get trailerUrl
    useEffect(() => {
        async function fetchData() {
            try {
                const movieDetail = `/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
                const tvDetail = `/tv/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`

                let fetchDateType;
                (type === "movies" || type === undefined) ? fetchDateType = movieDetail : fetchDateType = tvDetail

                var request = await httpRequest.get(fetchDateType)
                let trailerIndex = request.videos.results.findIndex(v => v.type === "Trailer")

                setDelayUrl(request.videos.results[trailerIndex])
                return request;
            } catch (error) {
                console.error(error)

            }
        }
        fetchData();
    }, [API_KEY, movie.id, type])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTrailerUrl(delayUrl)
        }, 1500);

        return () => clearTimeout(timer);
    }, [delayUrl])

    useEffect(() => {
        setTrailerUrl("")
    }, [genreIds.selectedGenre, genreIds.selectedMovieGenre])

    const checkReady = (e) => {
        // bannerMId.setBannerVolumeClicked(prev => !prev)
        // e.target.mute()

        bannerMId.bannerVolumeClicked ? trailerRef.current.internalPlayer.mute() : trailerRef.current.internalPlayer.unMute()
        e.target.setVolume(50);
        e.target.playVideo();
        var res = e.target.playerInfo.playerState
        if (res === -1) {
            setTrailerUrl("")
        }

    }

    const checkElapsedTime = (e) => {
        // clearTimeout(timerId)
        const duration = e.target.getDuration();
        var currentTime = e.target.getCurrentTime();
        if (currentTime / duration >= 0.3) {
            setTrailerUrl("")
        }
    }

    //handle video 
    const handleVolumeClick = () => {
        bannerMId.setBannerVolumeClicked(prev => !prev)
        bannerMId.bannerVolumeClicked ? trailerRef.current.internalPlayer.unMute() : trailerRef.current.internalPlayer.mute()
    }

    // truncate function
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const videoOptions = {
        width: "100%",
        // aspectRatio: "16:9",
        height: "822px",

        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,


        },
    }

    return (
        <div className={cx('banner')}
            style={{
                backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,

            }}
        >
            {trailerUrl && <div className={cx('banner-youtube')}

            >
                <Youtube
                    ref={trailerRef}
                    videoId={`${trailerUrl.key}`}
                    containerClassName={cx('embed-youtube')}
                    onReady={(e) => checkReady(e)}
                    onStateChange={(e) => checkElapsedTime(e)}
                    opts={videoOptions}


                /></div>
            }
            <div className={cx('banner_left_cover')}></div>
            <div className={cx('banner_right_cover')}></div>
            <div className={cx('banner_bottom_cover')}></div>
            {/* <div className={cx('overlay')}>
            </div> */}


            <motion.div className={cx('banner__content')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className={cx('banner__info')}>
                    <h1 className={cx('banner__title')}>
                        {/* check if api return has title or not and so on */}
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <div className={cx('banner__description')}>
                        <p>
                            {truncate(movie?.overview, 150)}
                        </p>
                    </div>
                </div>

                <div className={cx('banner__btns')}>
                    <button className={cx('banner__btn', 'play_btn')}>
                        <PlayArrowRoundedIcon sx={{ marginRight: '10px', fontSize: '1.8em' }} />
                        <span>Play</span>
                    </button>
                    <button className={cx('banner__btn', 'info_btn')} >
                        <InfoOutlinedIcon sx={{ marginRight: '10px', fontSize: '1.5em' }} />
                        <span>More Info</span>
                    </button>
                </div>
            </motion.div>

            {trailerUrl && <div className={cx('banner_btns-right')} onClick={() => handleVolumeClick()} >
                {bannerMId.bannerVolumeClicked ? <VolumeOffOutlinedIcon sx={{ fontSize: '1.6em' }} /> :
                    <VolumeUpOutlinedIcon sx={{ fontSize: '1.6em' }} />}
            </div>}
        </div>
    );
}

export default memo(Banner);