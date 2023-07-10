import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Layout,
  theme,
  Button,
  ColorPicker,
  ColorPickerProps,
  Drawer,
  Tour,
  TourProps,
  Space,
} from 'antd';
import { SIDEBAR_ITEMS } from '@/data/constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Content } from 'antd/es/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import { useAccentColor } from '@/hooks/useAccentColor';

export default function MyDrawer() {
  // tour기능
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  // tour refs
  const ref0 = useRef(null); // 시작
  const ref1 = useRef(null); // 소비기록
  const ref2 = useRef(null); // 소비통계
  const ref3 = useRef(null); // 어바웃
  const ref4 = useRef(null); // 색선택
  const refs = [ref1, ref2, ref3, ref4];

  const steps: TourProps['steps'] = [
    {
      title: 'SOBI 안내를 시작합니다',
      target: () => ref0.current,
    },
    {
      title: '소비기록',
      description: '소비기록을 입력하면 달력에 표시됩니다',
      target: () => ref1.current,
    },
    {
      title: '소비통계',
      description: '월별 소비 그래프를 보여줍니다',
      target: () => ref2.current,
    },
    {
      title: 'ABOUT',
      description: '팀원을 소개합니다!',
      target: () => ref3.current,
    },
    {
      title: '강조색 선택',
      description: '마음에 드는 색을 선택해주세요',
      target: () => ref4.current,
    },
  ];

  // 현재 url의 경로값을 알 수 있는 react router의 hook;
  const { pathname } = useLocation();

  // custom hook에서 가져온 강조색을 변경해주는 함수
  const { handleAccentColor } = useAccentColor();

  // 페이지 이동을 위해서 가져온 react router의 hook
  const navigate = useNavigate();

  // colorPrimary가 강조색(accentColor)입니다.
  // antD의 hook로, 전역에서 지정한 colorPrimary를 사용 할 수 있음
  const {
    token: { colorPrimary },
  } = theme.useToken();

  // Drawer가 열렸는지 닫혔는지를 useState로 저장
  const [open, setOpen] = useState(false);

  // color picker 관련 로직
  const [colorHex, setColorHex] = useState<Color | string>(colorPrimary);
  // 투명도를 조절하는 경우
  const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
  // 투명도를 조절하지 않은 경우 그냥 string값을 return 하면 되고 투명도를 조절했을 경우 계산이 들어감
  const hexString = useMemo(
    () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
    [colorHex],
  );
  // 그러나 투명도를 조절한다고 해서 강조색이 바뀌지는 않음

  useEffect(() => {
    // hex값을 강조색으로 지정
    handleAccentColor(hexString);
    // 해당 hex값을 로컬저장소에 "accentColor" key값으로 저장
    localStorage.setItem('accentColor', JSON.stringify(hexString));
  }, [handleAccentColor, hexString]);

  return (
    <>
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        steps={steps}
        placement="rightTop"
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
          setTourOpen(!localStorage.getItem('visited'));
          localStorage.setItem('visited', JSON.stringify(true));
        }}
        style={{ position: 'absolute', top: 10, left: 10 }}
        icon={<MenuOutlined />}
      />
      <div
        ref={ref0}
        style={{
          width: 190,
          height: 40,
          position: 'absolute',
          top: '30px',
          left: '50px',
        }}
      />
      <Drawer
        // 왼쪽에서 열림
        placement="left"
        width={300}
        onClose={() => setOpen(false)}
        open={open}
        // 이거 true하면 이상한 x버튼 생김
        closable={false}
      >
        <Title
          style={{
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {/* theme에서 가져온 강조색 사용 */}
          <span style={{ color: colorPrimary }}>SO</span>BI
        </Title>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {SIDEBAR_ITEMS.map((item, index) => (
            <Button
              block
              type={pathname === item.href ? 'primary' : 'default'}
              style={{ fontSize: 16, width: '100%', height: 40 }}
              key={item.href}
              // tour를 위한 ref
              ref={refs[index]}
              icon={<item.icon />}
              onClick={() => {
                navigate(item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </Button>
          ))}
        </Space>
        <div ref={ref4} style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <ColorPicker
            format={formatHex}
            value={colorHex}
            onChange={setColorHex}
            onFormatChange={setFormatHex}
          />
        </div>
      </Drawer>
      <Layout>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}
