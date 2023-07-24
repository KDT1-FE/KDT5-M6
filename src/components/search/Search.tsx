import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSearchConsume } from "../../lib/api/consumeAPI";
import Button from "../common/Button";
import { RiPencilFill, RiDeleteBinFill } from "react-icons/ri";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";
import { formatDate } from "../../utils/util";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openModalAtom,
  openDeleteModalAtom,
  openEditModalAtom,
} from "../../state/modalClose";

interface ISearchProps {
  userId: string;
}
interface ISearchResultProps {
  amount: number;
  userId: string;
  category: string;
  date: string;
  _id: string;
}

function Search({ userId }: ISearchProps) {
  const addValue = useRecoilValue(openModalAtom);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResultProps[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = useRecoilState(openEditModalAtom);
  const [openDeleteModal, setOpenDeleteModal] =
    useRecoilState(openDeleteModalAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchText) {
          const result = await getSearchConsume({
            keyword: searchText,
            userId: userId,
          });
          const data = result.data;
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log("Error occurred while searching:", error);
      }
    };
    setTimeout(() => fetchData(), 5);
  }, [searchText, userId, addValue, openEditModal, openDeleteModal]);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenDeleteModal = (_id: string) => {
    setOpenDeleteModal(true);
    setSelectedItemId(_id);
  };

  const handleOpenEditModal = (_id: string) => {
    setOpenEditModal(true);
    setSelectedItemId(_id);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      setSearchResults([]);
    }
  };

  return (
    <Container>
      <Title>내역조회</Title>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      {searchText === "" ? (
        <NoResultText>내역조회 결과가 없습니다.</NoResultText>
      ) : (
        <>
          {searchResults.length > 0 && (
            <ResultContainer>
              {/* Result header */}
              <ResultHeader>
                <ResultHeaderText>카테고리</ResultHeaderText>
                <ResultHeaderText>날짜</ResultHeaderText>
                <ResultHeaderText>금액</ResultHeaderText>
                <ResultHeaderText>수정 / 삭제</ResultHeaderText>{" "}
              </ResultHeader>

              {/* Result items */}
              {searchResults.map((result, index) => (
                <ResultItem key={index}>
                  <Category>{result.category}</Category>
                  <Date>{formatDate(result.date)}</Date>
                  <Amount>{result.amount}원</Amount>
                  <ButtonsContainer>
                    <EditButton onClick={() => handleOpenEditModal(result._id)}>
                      <RiPencilFill />
                    </EditButton>
                    {openEditModal && selectedItemId === result._id && (
                      <EditModal
                        id={result._id}
                        amount={result.amount}
                        userId={result.userId}
                        category={result.category}
                        date={result.date}
                        handleCloseModal={handleCloseEditModal}
                      />
                    )}
                    <DeleteButton
                      onClick={() => handleOpenDeleteModal(result._id)}
                    >
                      <RiDeleteBinFill />
                    </DeleteButton>
                    {openDeleteModal && selectedItemId === result._id && (
                      <DeleteModal
                        id={result._id}
                        handleCloseModal={handleCloseDeleteModal}
                      />
                    )}
                  </ButtonsContainer>
                </ResultItem>
              ))}
            </ResultContainer>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 800px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled(Button)`
  height: 38px;
  padding: 0 20px;
`;

const ResultContainer = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  flex-direction: column;
`;

const ResultHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  & > :first-child {
    margin-left: 10px; /* 원하는 마진 값을 적용하세요 */
  }
`;

const ResultHeaderText = styled.div`
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
`;

const ResultItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto auto;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Category = styled.div`
  margin-left: 10px;
  text-align: left;
`;

const Date = styled.div`
  text-align: left;
`;

const Amount = styled.div`
  text-align: left;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const EditButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  margin-left: 5px;
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const NoResultText = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #555; /* 원하는 색상으로 변경 가능 */
`;

export default Search;
