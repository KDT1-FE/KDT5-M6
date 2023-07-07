import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { SIDEBAR_ITEMS } from '@/data/constants';
import { Outlet, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { Content } from 'antd/es/layout/layout';
import { MenuOutlined } from '@ant-design/icons';

export default function MyDrawer() {
  const navigate = useNavigate();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ position: 'absolute', top: 10, left: 10 }}
        icon={<MenuOutlined />}
      />

      <Drawer
        placement="left"
        width={500}
        onClose={onClose}
        open={open}
        closable={false}
      >
        <Title
          style={{
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          <span style={{ color: colorPrimary }}>SO</span>BI
        </Title>
        <Menu
          style={{ fontSize: 16 }}
          inlineIndent={40}
          mode="inline"
          defaultSelectedKeys={['/']}
          items={SIDEBAR_ITEMS.map((item) => ({
            key: item.href,
            icon: <item.icon style={{ fontSize: 16 }} />,
            label: item.label,
            onClick: () => {
              navigate(item.href);
              onClose();
            },
          }))}
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
