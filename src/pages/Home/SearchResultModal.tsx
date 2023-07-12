import { SearchResultType } from '@/types/search';
import { formatPaymentDate } from '@/utils/formatPaymentDate';
import { Typography, Divider, Modal } from 'antd';
const { Text } = Typography;

interface SearchResultModalProps {
  searchResultModalOpen: boolean;
  setSearchResultModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: SearchResultType[];
}

export default function SearchResultModal({
  searchResultModalOpen,
  setSearchResultModalOpen,
  searchResults,
}: SearchResultModalProps) {
  return (
    <Modal
      centered
      title="검색 결과"
      open={searchResultModalOpen}
      onCancel={() => setSearchResultModalOpen(false)}
      footer={null}
    >
      {searchResults.length === 0 ? (
        <Text>No results found.</Text>
      ) : (
        searchResults.map((result: SearchResultType, index: number) => (
          <div key={result._id}>
            <Text>{'물품: ' + result.category}</Text>
            <br />
            <Text>{'가격: ' + result.amount}</Text>
            <br />
            <Text>{'결제 날짜: ' + formatPaymentDate(result.date)}</Text>
            {index !== searchResults.length - 1 && <Divider />}
          </div>
        ))
      )}
    </Modal>
  );
}
