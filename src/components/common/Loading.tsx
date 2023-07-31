import { MoonLoader } from 'react-spinners'
import styled from 'styled-components'

export function Loading() {
  return (
    <ContentWrap>
      <MoonLoader color="#36d7b7" />
    </ContentWrap>
  )
}

const ContentWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
