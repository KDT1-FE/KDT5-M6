import { headerLocations } from 'constants/index'
import { styled } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'

export const Header = () => {
  const location = headerLocations.find(location => location.path === useLocation().pathname) ?? {
    path: '',
    title: ''
  }

  return (
    <HeaderContainer>
      <h1>{location.title}</h1>
      {location.path === '/' || location.path === '/search' ? null : (
        <SearchLink to="/search">
          <AiOutlineSearch />
        </SearchLink>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  max-width: 768px;
  width: 100%;
  height: 56px;
  background-color: var(--color-primary);
  color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow: hidden;
  /* position: relative; */

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`

const SearchLink = styled(Link)`
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
`
