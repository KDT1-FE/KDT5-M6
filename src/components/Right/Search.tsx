import { styled } from 'styled-components';
import List from '../common/List';

function Search() {
  // 테스트용 임시 데이터
  const content = {
    amount: 100,
    userId: 'user123',
    category: 'food',
    date: '2023-07-01T10:30:00.000Z'
  };

  return (
    <div>
      <input></input>
      <div>
        <button>전체</button>
        <button>수입</button>
        <button>지출</button>
        {/* <List data={content} /> */}
      </div>
    </div>
  );
}

export default Search;
