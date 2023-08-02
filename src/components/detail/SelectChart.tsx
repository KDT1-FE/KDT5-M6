import styled from 'styled-components'

interface OnSelectChartProps {
  onSelectChart: (value: string) => void
}

function SelectChart({onSelectChart}: OnSelectChartProps) {
  const handleSelectChart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    onSelectChart(value)
    e.target.blur();
  }
  
  return (
    <StyledSelectChart onChange={handleSelectChart}>
      <option value="bar">
        bar
      </option>
      <option value="pie">
        pie
      </option>
      <option value = 'doughnut'>
        doughnut
      </option>
    </StyledSelectChart>
  )
}

export default SelectChart

const StyledSelectChart = styled.select`
  width: 120px;
  height: 30px;
  font-size: 20px;
  text-align: center;
  margin-left: 20px;
`