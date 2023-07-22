import { Skeleton } from 'antd';
export default function MySkeleton() {
  return (
    <Skeleton.Input
      active
      block
      style={{ width: '90vw', paddingBottom: '50%' }}
    />
  );
}
