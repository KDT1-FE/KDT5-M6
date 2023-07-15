import { Alert } from 'antd';
import { useEffect, useState } from 'react';

interface BannerProps {
  message: string;
  type: 'success' | 'error';
}

export default function Banner({ message, type }: BannerProps) {
  const [alertOpacity, setAlertOpacity] = useState(0);

  useEffect(() => {
    setAlertOpacity(1);
    setTimeout(() => {
      setAlertOpacity(0);
    }, 3000);
  }, [message]);

  return (
    <Alert
      type={type}
      message={message}
      banner
      style={{
        width: '100%',
        marginBottom: 8,
        opacity: alertOpacity,
        transition: 'ease-in-out 0.5s',
      }}
    />
  );
}
