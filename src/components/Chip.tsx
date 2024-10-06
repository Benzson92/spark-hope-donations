import React, { FC } from 'react';
import styled from 'styled-components';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const ChipWrapper = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid ${({ selected }) => (selected ? '#1a53f0' : '#ccc')};
  /* background-color: ${({ selected }) => (selected ? '#e5f1fc' : '#fff')}; */
  color: ${({ selected }) => (selected ? '#1a53f0' : '#333')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  transition:
    background-color 0.3s,
    border-color 0.3s;

  &:hover {
    /* background-color: #e5f1fc; */
    border-color: #4a90e2;
  }
`;

const Chip: FC<ChipProps> = ({ label, selected, onClick }) => (
  <ChipWrapper selected={selected} onClick={onClick}>
    {label}
  </ChipWrapper>
);

export default Chip;
