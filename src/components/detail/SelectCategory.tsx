import styled from 'styled-components'

interface OnSelectCategory {
  summaries: SearchResponseItem[]
  onSelectCategory: (value: string) => void
}

function SelectCategory({summaries, onSelectCategory}: OnSelectCategory) {

  const handleChangeCategory = (e:React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCategory(e.target.value)
    e.target.blur();
  }

  return (
    <>
    <StyledSelectCategory onChange={handleChangeCategory} >
      <option value = ''>
        카테고리
      </option>
      {summaries.map((item, index) => 
        <option key = {index} value = {item.category}>
          {item.category.replace(/, .*$/, '')}
        </option>
      )}
    </StyledSelectCategory>
  </>

  )
}

export default SelectCategory

const StyledSelectCategory = styled.select`
  width: 140px;
  height: 30px;
  font-size: 18px;
  text-align: center;
  margin-left: 20px;
`