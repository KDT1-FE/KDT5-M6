import styled from "styled-components";

 // 진행률에 따른 원의 길이 계산
export const Spinner = ({ progress = 0, text = "0" }) => {
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetValue = circumference - (progress / 100) * circumference;

  return (
    <SpinnerContainer>
      <SpinnerSVG viewBox="0 0 100 100">
       {/* 원형 진행률 표시기의 배경 원*/}
        <SpinnerBackground cx="50" cy="50" r={radius} strokeWidth={strokeWidth} />
        {/* 진행률을 표시하는 원 */}
        <SpinnerCircle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDashoffset={strokeDashoffsetValue}
          strokeDasharray={circumference}
        />
      </SpinnerSVG>
      <SpinnerLabelText>사용 금액</SpinnerLabelText>
      <SpinnerText>{text}</SpinnerText>
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
`;

const SpinnerSVG = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

const SpinnerBackground = styled.circle`
  fill: none;
  stroke: #eee;
  stroke-width: 10px;
`;

const SpinnerCircle = styled.circle`
  fill: none;
  stroke: #A68BFC;
  stroke-width: 10px;
  stroke-opacity: 0.8;
  transition: stroke-dashoffset 0.35s;
`;

const SpinnerText = styled.span`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  white-space: nowrap;
`;

const SpinnerLabelText = styled.span`
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
`;