import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import ThemeToggler from './ThemeToggler'
import {FiMessageCircle, FiSearch} from 'react-icons/fi'
import Favorites from './Favorites'
import {useSelector} from 'react-redux'
import {getImageURL} from '../helpers/image'

const Header = () => {
    const auth = useSelector((state) => state?.auth)

    return (
        <header>
            <Container>
                <div className="d-flex align-items-center">
                    <Link to="/" className="me-4">
                        <img src="/images/logo.svg" alt="Games.ru" />
                    </Link>
                    <form className="form-search d-none d-md-flex">
                        <input type="search" placeholder="Поиск по играм" />
                        <button type="submit">
                            <FiSearch />
                        </button>
                    </form>
                    <hr className="vertical d-none d-md-block mx-3 mx-xl-4" />
                    <Favorites />
                </div>
                <div className="d-none d-md-flex align-items-center">
                    <NavLink to="/account/help">Помощь</NavLink>
                    <button type="button" className="ms-5 d-none d-lg-flex align-items-center">
                        <FiMessageCircle className="fs-12 me-1" />
                        <span>Онлайн-чат</span>
                    </button>
                </div>
                <div className="d-flex align-items-center">
                    <ThemeToggler />
                    <hr className="vertical d-none d-xl-block mx-3 mx-xl-4" />
                    {auth?.isAuth ? (
                        <Link to="/account" className="user ms-4">
                            <img
                                className="user__avatar"
                                src={getImageURL(auth?.user?.avatar)}
                                alt={auth?.user?.nickname}
                            />
                            <span className="user__nickname">{auth?.user?.nickname}</span>
                        </Link>
                    ) : (
                        <>
                            <Link to="/registration" className="d-none d-xl-block">
                                Регистрация
                            </Link>
                            <Link to="/login" className="d-none d-md-block btn-1 ms-4">
                                Войти
                            </Link>
                        </>
                    )}
                </div>
            </Container>
        </header>
    )
}

export default Header
