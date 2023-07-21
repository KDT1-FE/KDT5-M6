// 사진들
import jw from '@/assets/profileImage/jw.jpg';
import sw from '@/assets/profileImage/sw.png';
import hs from '@/assets/profileImage/hs.jpg';
import dh from '@/assets/profileImage/dh.png';

export const API_BASE_URL = 'https://chickenlecture.xyz';

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
    imgUrl: jw,
    roles: ['팀장', '소비통계', '호우킹'],
    comment: '수학의 정석 한권',
  },
  {
    name: '이시우',
    github: 'https://github.com/cuconveniencestore',
    imgUrl: sw,
    roles: ['소비 CRUD', 'CU편의점', '모범생'],
    comment: '24시간이 모자라',
  },
  {
    name: '문현수',
    github: 'https://github.com/96uoow',
    imgUrl: hs,
    roles: ['달력', '개블리셔'],
    comment: '자바스크립트 쉽다',
  },
  {
    name: '문대현',
    github: 'https://github.com/dhmoon11',
    imgUrl: dh,
    roles: ['검색', '예비군수석'],
    comment: '개발이 제일 쉽다',
  },
];
