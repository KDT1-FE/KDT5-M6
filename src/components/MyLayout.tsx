import { useState } from 'react';
import { MenuOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { SIDEBAR_ITEMS } from '@/data/constants';
import Title from 'antd/es/typography/Title';
import { Outlet, useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function MyLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Title
        style={{
          position: 'absolute',
          fontWeight: 700,
          top: 10,
          left: '60px',
          zIndex: 1,
          transform: `${collapsed ? `translate(-200px, 0)` : ''}`,
          opacity: `${collapsed ? '0' : '1'}`,
          transition: 'all 0.2s',
        }}
      >
        <span style={{ color: colorPrimary }}>SO</span>BI
      </Title>
      <Sider
        collapsible
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        collapsed={collapsed}
        collapsedWidth="0"
        style={{
          boxShadow: '0.2px 0.5px 0.2px rgba(1,1,1,0.1)',
        }}
      >
        <Menu
          defaultSelectedKeys={['/']}
          mode="inline"
          items={SIDEBAR_ITEMS.map((item) => ({
            key: item.href,
            icon: <item.icon />,
            label: item.label,
            onClick: () => navigate(item.href),
          }))}
          style={{ marginTop: '150px' }}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
