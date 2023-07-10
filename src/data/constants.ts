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
  { value: '3', label: '최근 3개월' },
  { value: '6', label: '최근 6개월' },
  { value: '9', label: '최근 9개월' },
  { value: '12', label: '최근 12개월' },
  { value: '15', label: '최근 15개월' },
  { value: '18', label: '최근 18개월' },
  { value: '21', label: '최근 21개월' },
  { value: '24', label: '최근 24개월' },
];
