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
        width: 300,
        margin: 'auto',
      }}
      bordered={false}
      cover={<img alt={`${name}'s profile`} src={imgUrl} />}
      actions={[
        <a href={github} target="_blank">
          <GithubOutlined key="github" style={{ fontSize: 20 }} />
        </a>,
        <Popover content={`"${comment}"`}>
          <MessageOutlined key="comment" style={{ fontSize: 20 }} />
        </Popover>,
      ]}
    >
      <Meta
        title={name}
        description={
          <>
            {roles.map((role, index) => (
              <Tag
                color={colorPrimaryBg}
                key={index}
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
