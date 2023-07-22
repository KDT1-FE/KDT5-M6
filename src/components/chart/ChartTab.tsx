import React from 'react'
import { styled } from 'styled-components'
import { chartTabs } from 'constants/index'

type ChartTabProps = {
  selectedTab: string
  onClickTab: (title: string) => void
}

export const ChartTab = React.memo(({ selectedTab, onClickTab }: ChartTabProps) => {
  return (
    <Wrapper>
      <ul>
        {chartTabs.map(tab => (
          <TabItem
            key={tab.title}
            isSelected={selectedTab === tab.title}
            onClick={() => onClickTab(tab.title)}>
            {tab.title}
          </TabItem>
        ))}
      </ul>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  margin-top: 40px;
  padding: 0 40px;

  ul {
    display: flex;
    width: 100%;
  }
`

const TabItem = styled.li<{ isSelected: boolean }>`
  flex-grow: 1;
  height: 40px;
  margin: 0 40px;
  color: var(--color-black);
  border-bottom: 3px solid;
  border-color: ${props => (props.isSelected ? 'var(--color-tab-active)' : 'var(--color-white)')};
  font-weight: ${props => (props.isSelected ? '700' : '500')};
  display: flex;
  justify-content: center;
  align-items: center;
`
