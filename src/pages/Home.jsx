import React, {useState} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, EffectFade, Mousewheel, Navigation, Thumbs} from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'

import GameMini from '../components/GameMini'
import GameMidi from '../components/GameMidi'
import GameLarge from '../components/GameLarge'
import Sort from '../components/Sort'
import ChatWindow from '../components/ChatWindow'

import {HiArrowNarrowLeft, HiArrowNarrowRight} from 'react-icons/hi'
import News from '../components/News'
import SortSection from '../components/SortSection'
import {getImageURL} from '../helpers/image'
import Skeleton from 'react-loading-skeleton'
import {useSelector} from 'react-redux'
import useGetBanner from '../hooks/axios/getBanner'
import useGetCatalogAllGame from '../hooks/axios/getCatalogAllGame'
import useGetAllNews from '../hooks/axios/getAllNews'

const Home = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const {banner} = useGetBanner()
    const {allGames} = useGetCatalogAllGame()
    const {news} = useGetAllNews()

    return (
        <main>
            <SortSection />

            <Container fluid="md" className="px-mobile-0">
                <section className="main-slider mb-6">
                    <Swiper
                        loop={false}
                        effect={'fade'}
                        spaceBetween={20}
                        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                        modules={[EffectFade, Thumbs, Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        className="mainslides"
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                pagination: false,
                            },
                        }}
                    >
                        {banner.isLoaded ? (
                            banner.items?.length > 0 ? (
                                banner.items?.map((i) => (
                                    <SwiperSlide key={i.id}>
                                        <GameLarge
                                            title={i.game?.name}
                                            imgLink={getImageURL(i.image)}
                                            description={i.description}
                                            subLinksArr={i.game?.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.game?.slug}`, anchor: j?.name}
                                                })
                                            )}
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <h6>?????? ??????</h6>
                            )
                        ) : (
                            <Skeleton
                                count={1}
                                baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                width={'100%'}
                                height={'30em'}
                            />
                        )}
                        <div className="swiper-button-prev btn-2">
                            <HiArrowNarrowLeft />
                        </div>
                        <div className="swiper-button-next btn-2">
                            <HiArrowNarrowRight />
                        </div>
                    </Swiper>
                    <Swiper
                        direction="vertical"
                        loop={false}
                        spaceBetween={20}
                        slidesPerView={5}
                        watchSlidesProgress={true}
                        modules={[Thumbs, Autoplay, Mousewheel]}
                        mousewheel={true}
                        className="thumbslides"
                        onSwiper={setThumbsSwiper}
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                    >
                        {banner.isLoaded ? (
                            banner.items?.length > 0 ? (
                                banner.items?.map((i) => (
                                    <SwiperSlide key={i.id}>
                                        <GameMini title={i.game?.name} imgLink={getImageURL(i.image)} />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <h6>?????? ??????</h6>
                            )
                        ) : (
                            <Skeleton
                                count={1}
                                baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                width={'100%'}
                                height={'50px'}
                            />
                        )}
                    </Swiper>
                </section>
            </Container>

            <Container>
                <h1>?????????????? ??????</h1>
                <div id="sort">
                    <Sort />
                </div>

                <section id="sort-1" className="mt-6 mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>??????</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-4 gy-sm-5 gx-2 gx-sm-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i.isTop === true)?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i.isTop === true)
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i?.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>

                <section id="sort-2" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>0???9</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) =>
                            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']?.includes(i?.name?.toString()[0])
                        )?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) =>
                                    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']?.includes(
                                        i?.name?.toString()[0]
                                    )
                                )
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            imgLink={getImageURL(i.logo)}
                                            slug={i.slug}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>

                <section id="sort-3" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Aa</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('a'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('a'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>

                <section id="sort-4" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Bb</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('b'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('b'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>

                <section id="sort-5" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Cc</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('c'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('c'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-6" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Dd</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('d'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('d'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-7" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Ee</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('e'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('e'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-8" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Ff</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('f'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('f'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-9" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Gg</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('g'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('g'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-10" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Hh</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('h'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('h'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-11" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Ii</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('i'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('i'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-12" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Jj</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('j'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('j'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-13" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Kk</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('k'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('k'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-14" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Ll</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('l'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('l'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-15" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Mm</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('m'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('m'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-16" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Nn</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('n'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('n'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-17" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Oo</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('o'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('o'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-18" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Pp</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('p'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('p'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-19" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Qq</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('q'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('q'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-20" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Rr</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('r'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('r'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-21" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Ss</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('s'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('s'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-22" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Tt</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('t'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('t'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-23" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Uu</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('u'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('u'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-24" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Vv</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('v'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('v'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-25" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Ww</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('w'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('w'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-26" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>????</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('x'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('x'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-27" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Yy</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('y'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('y'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>
                <section id="sort-28" className="mb-6">
                    <div className="d-flex align-items-center mb-4 mb-sm-5">
                        <h3>Zz</h3>
                        <hr className="horizontal flex-1 ms-4" />
                    </div>
                    <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                        {allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith('z'))?.length > 0 ? (
                            allGames?.items
                                ?.filter((i) => i?.name?.toLowerCase().startsWith('z'))
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i.regions?.map((k) =>
                                                k.categories?.map((j) => {
                                                    return {link: `game/${i.slug}`, anchor: j?.name}
                                                })
                                            )}
                                            regions={i?.regions?.map((j) => j.name)}
                                        />
                                    </Col>
                                ))
                        ) : (
                            <h6>???????????? ??????</h6>
                        )}
                    </Row>
                </section>

                <hr className="horizontal mb-5" />

                <section className="mb-6">
                    <Row className="flex-lg-row-reverse">
                        <Col lg={5} xxl={4} className="d-none d-md-block mb-5">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <h2 className="mb-0">??????????????</h2>
                                <a href="/">?????? ??????????????</a>
                            </div>
                            {news?.isLoaded ? (
                                news?.meta?.total > 0 ? (
                                    news?.items?.map((i) => (
                                        <News
                                            createdAt={i.createdAt}
                                            suptitle={i.suptitle}
                                            slug={i.slug}
                                            image={i.image}
                                            title={i.title}
                                            key={i.id}
                                            readingTimeFrom={i.readingTimeFrom}
                                        />
                                    ))
                                ) : (
                                    <h6>???????????? ??????</h6>
                                )
                            ) : (
                                <Skeleton
                                    count={5}
                                    baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                    highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                    width={'100%'}
                                    height={'50px'}
                                />
                            )}
                        </Col>
                        <Col lg={7} xxl={8} className="pe-xxl-5">
                            <ChatWindow />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Home
