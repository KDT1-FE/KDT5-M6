import {
  foodIcon,
  transportationIcon,
  culturalIcon,
  dailyNecessityIcon,
  clothesIcon,
  beautyIcon,
  medicalHealthIcon,
  educationIcon,
  communicationIcon,
  gatheringIcon,
  eventsIcon,
  savingIcon,
  electronicsIcon,
  utilitiesIcon,
  cardIcon,
  etcIcon,
  salaryIcon,
  moneyIcon,
  cashIcon,
  debitCardIcon,
  creditCardIcon,
} from '@/lib/utils/Icons';
import styled from 'styled-components';

export const tags = [
  { label: '식비', icon: foodIcon },
  { label: '문화생활', icon: culturalIcon },
  { label: '교통비', icon: transportationIcon },
  { label: '생필품', icon: dailyNecessityIcon },
  { label: '의류', icon: clothesIcon },
  { label: '미용', icon: beautyIcon },
  { label: '의료/건강', icon: medicalHealthIcon },
  { label: '교육', icon: educationIcon },
  { label: '통신비', icon: communicationIcon },
  { label: '회식/모임', icon: gatheringIcon },
  { label: '경조사', icon: eventsIcon },
  { label: '저축', icon: savingIcon },
  { label: '가전', icon: electronicsIcon },
  { label: '공과금', icon: utilitiesIcon },
  { label: '카드대금', icon: cardIcon },
  { label: '기타', icon: etcIcon },
  { label: '월급', icon: salaryIcon },
  { label: '용돈', icon: moneyIcon },
  { label: '현금', icon: cashIcon },
  { label: '체크카드', icon: debitCardIcon },
  { label: '신용카드', icon: creditCardIcon },
];

export const expenseTags = [
  { label: '식비', icon: foodIcon },
  { label: '문화생활', icon: culturalIcon },
  { label: '교통비', icon: transportationIcon },
  { label: '생필품', icon: dailyNecessityIcon },
  { label: '의류', icon: clothesIcon },
  { label: '미용', icon: beautyIcon },
  { label: '의료/건강', icon: medicalHealthIcon },
  { label: '교육', icon: educationIcon },
  { label: '통신비', icon: communicationIcon },
  { label: '회식/모임', icon: gatheringIcon },
  { label: '경조사', icon: eventsIcon },
  { label: '저축', icon: savingIcon },
  { label: '가전', icon: electronicsIcon },
  { label: '공과금', icon: utilitiesIcon },
  { label: '카드대금', icon: cardIcon },
  { label: '기타', icon: etcIcon },
];

export const depositTags = [
  { label: '월급', icon: salaryIcon },
  { label: '용돈', icon: moneyIcon },
  { label: '기타', icon: etcIcon },
];

const CashIcon = () => <StyledCashIcon>{cashIcon}</StyledCashIcon>;
const DebitCardIcon = () => <StyledDebitCardIcon>{debitCardIcon}</StyledDebitCardIcon>;
const CreditCardIcon = () => <StyledCreditCardIcon>{creditCardIcon}</StyledCreditCardIcon>;

export const PaymentTags = [
  { label: '현금', icon: <CashIcon /> },
  { label: '체크카드', icon: <DebitCardIcon /> },
  { label: '신용카드', icon: <CreditCardIcon /> }
];

const StyledCashIcon = styled.span `
  color: green;
`;

const StyledDebitCardIcon = styled.span `
  color: blue;
`;

const StyledCreditCardIcon = styled.span `
  color: red;
`;
