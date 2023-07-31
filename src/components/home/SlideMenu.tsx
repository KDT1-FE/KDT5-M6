import styled from 'styled-components'
import { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LogoutIcon, LoginIcon } from '@heroicons/react/outline'
import { UserCircleIcon } from '@heroicons/react/solid'

export const SlideMenu = ({ isMenuOpen, handleCloseMenu }) => {
  const outside = useRef<any>()
  const id = localStorage.getItem('id')

  const handleClickOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      handleCloseMenu()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  const handleClickLogoutButton = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    handleCloseMenu()
    window.location.reload()
  }
  return (
    <MenuSlideBackground className={isMenuOpen ? 'open' : ''}>
      <MenuSlide
        className={isMenuOpen ? 'open' : ''}
        ref={outside}>
        <MenuItem className="user-info">
          <UserCircleIcon />
          <div className="info">
            {id ? <span>ID: {id}</span> : <span>로그인이 필요합니다.</span>}
          </div>
        </MenuItem>

        {id ? (
          <MenuItem className="logout">
            <LogoutIcon />
            <LogoutButton onClick={handleClickLogoutButton}>
              로그아웃
            </LogoutButton>
          </MenuItem>
        ) : (
          <MenuItem>
            <LoginIcon />
            <NavLink
              to="signin"
              className="login">
              로그인
            </NavLink>
          </MenuItem>
        )}
      </MenuSlide>
    </MenuSlideBackground>
  )
}

const MenuSlideBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  transition: 0.1s ease;
  font-family: 'TheJamsil3Regular';
  &.open {
    visibility: visible;
  }
`
const MenuSlide = styled.div`
  position: absolute;
  left: -250px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
  font-family: 'TheJamsil3Regular';
  transition: 0.5s ease;
  &.open {
    left: 0;
  }
`
const MenuItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40%;
  height: 56px;
  font-family: 'TheJamsil3Regular';
  &.user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    svg {
      position: relative;
      left: 0;
      width: 48px;
      height: 48px;
      margin-right: 5px;
      color: #fff;
    }
  }
  .login {
    margin-left: 5px;
    text-decoration: none;
    color: ${props => props.theme.colors.text_secondary};
    &:hover {
      color: ${props => props.theme.colors.orange};
    }
  }
  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.theme.colors.text_secondary};
  }
`
const LogoutButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'TheJamsil3Regular';
  font-size: 16px;
  &:hover {
    color: ${props => props.theme.colors.orange};
  }
`
