import { MessageOutlined, GithubOutlined } from '@ant-design/icons';
import { Card, Popover, Tag, theme } from 'antd';

const { Meta } = Card;

interface MyCardProps {
  imgUrl: string;
  roles: string[];
  github: string;
  name: string;
  comment: string;
}

export default function MyCard({
  imgUrl,
  roles,
  github,
  name,
  comment,
}: MyCardProps) {
  const {
    token: { colorPrimary, colorPrimaryBg },
  } = theme.useToken();

  return (
    <Card
      style={{
        width: 280,
        margin: '20px auto',
      }}
      bordered={false}
      cover={<img alt={`${name}'s profile`} src={imgUrl} />}
      actions={[
        <a href={github} target="_blank">
          <GithubOutlined style={{ fontSize: 20 }} />
        </a>,
        <Popover content={`"${comment}"`}>
          <MessageOutlined style={{ fontSize: 20 }} />
        </Popover>,
      ]}
    >
      <Meta
        title={name}
        description={
          <>
            {roles.map((role) => (
              <Tag
                color={colorPrimaryBg}
                key={role}
                style={{
                  border: `1.5px solid ${colorPrimary}`,
                  color: `${colorPrimary}`,
                }}
              >
                {role}
              </Tag>
            ))}
          </>
        }
      />
    </Card>
  );
}
