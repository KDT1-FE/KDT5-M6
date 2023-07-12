// 사이드바 메뉴 아이템
import {
  CarryOutOutlined,
  AreaChartOutlined,
  SmileOutlined,
} from '@ant-design/icons';

export const SIDEBAR_ITEMS = [
  { label: '소비기록', href: '/', icon: CarryOutOutlined },
  { label: '소비통계', href: '/statistics', icon: AreaChartOutlined },
  { label: 'ABOUT', href: '/about', icon: SmileOutlined },
];

// 통계페이지에서 월구간 옵션
export const MONTH_RANGE_OPTIONS = [
  { value: '6', label: '최근 6개월' },
  { value: '12', label: '최근 12개월' },
  { value: '18', label: '최근 18개월' },
  { value: '24', label: '최근 24개월' },
];

// 어바웃 페이지 팀원 소개
export const TEAM_MEMBERS = [
  {
    name: '이정우',
    github: 'https://github.com/howooking',
    imgUrl: 'https://avatars.githubusercontent.com/u/87072568?v=4',
    roles: ['팀장', '소비통계'],
    comment: '호우는 귀엽다',
  },
  {
    name: '이시우',
    github: 'https://github.com/cuconveniencestore',
    imgUrl:
      'https://ca.slack-edge.com/T04MY0UKPGX-U04TB022F7V-aef43c65fb3c-512',
    roles: ['소비 CRUD', '편순이'],
    comment: '리액트 쉽다',
  },
  {
    name: '문현수',
    github: 'https://github.com/96uoow',
    imgUrl:
      'https://ca.slack-edge.com/T04MY0UKPGX-U04SWFSHE5V-e1f96d450bad-512',
    roles: ['달력', '개블리셔'],
    comment: '자바스크립트 쉽다',
  },
  {
    name: '문대현',
    github: 'https://github.com/dhmoon11',
    imgUrl:
      'https://ca.slack-edge.com/T04MY0UKPGX-U04TCAF2Z1Q-4de23c10c832-512',
    roles: ['검색', '예비군수석'],
    comment: '개발이 제일 쉽다',
  },
];
