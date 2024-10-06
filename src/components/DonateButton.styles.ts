import styled from 'styled-components';

const DonateButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1a53f0;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357ab9;
  }
`;

export default DonateButton;
