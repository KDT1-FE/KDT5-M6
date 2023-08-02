import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { theme } from '@/styles/theme';
import { FaArrowLeft } from 'react-icons/fa';
import AllTag from './AllTag';

interface SearchModalProps {
  close: () => void;
  setTag: React.Dispatch<React.SetStateAction<string>>;
}

function SearchModal({ close, setTag }: SearchModalProps) {
  const modalRef = useRef(null);

  const handleTagChange = (tags: string) => {
    setTag(tags);
    close();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) close();
  };

  return (
    <Container>
      <SearchModalWraaper ref={modalRef} onClick={handleClick}>
        <Modal>
          <BackButton onClick={close}>
            <FaArrowLeft />
          </BackButton>
          <AllTag handleTagChange={handleTagChange} />
        </Modal>
      </SearchModalWraaper>
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BackButton = styled.button`
  border: none;
  font-size: 20px;
  margin: 15px;
  cursor: pointer;
  background-color: #fff;
  position: relative;
  left: -150px;

  &:hover {
    color: ${theme.colors.red};
  }
`;

const SearchModalWraaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;
export default SearchModal;
