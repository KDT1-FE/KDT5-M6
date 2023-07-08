import { useState, useMemo, useEffect } from 'react';
import {
  Layout,
  Menu,
  theme,
  Button,
  ColorPicker,
  ColorPickerProps,
  Drawer,
} from 'antd';
import { SIDEBAR_ITEMS } from '@/data/constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Content } from 'antd/es/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import { useAccentColor } from '@/hooks/useAccentColor';

export default function MyDrawer() {
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
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{ position: 'absolute', top: 10, left: 10 }}
        icon={<MenuOutlined />}
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
        <Menu
          // 기본 스타일링에서 border가 있음
          style={{ fontSize: 16, border: 'none' }}
          inlineIndent={40}
          mode="inline"
          // 현재 경로와 url과 key값(item.href)이 일치하면 해당 메뉴가 활성화(색칠)상태로 보임
          defaultSelectedKeys={[pathname]}
          items={SIDEBAR_ITEMS.map((item) => ({
            key: item.href,
            icon: <item.icon style={{ fontSize: 16 }} />,
            label: item.label,
            onClick: () => {
              navigate(item.href);
              setOpen(false);
            },
          }))}
        />
        <ColorPicker
          style={{ position: 'absolute', bottom: 20, left: 20 }}
          format={formatHex}
          value={colorHex}
          onChange={setColorHex}
          onFormatChange={setFormatHex}
        />
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
