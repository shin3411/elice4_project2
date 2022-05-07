import styled from "styled-components";

export const FlexBox = styled.div`
  width: 100%;
  display: flex;
`;

export const FlexBoxCenter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeadingTwo = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #c48f5a;
`;

export const InputBox = styled.input`
  border: solid 2px #c99c6e;
  border-radius: 8px;
  height: 30px;
  margin: 1.7rem 0 0 0;
  padding: 10px;
  font-size: 1.3rem;
`;

export const Button = styled.button`
  width: 52.5%;
  height: 30px;
  background-color: #c48f5a;
  margin: 1.7rem 0 0 0;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  box-shadow: 3px 3px 3px gray;
  transition-duration: 0.3s;

  &:active {
    box-shadow: none;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, gray);
  }
`;

export const LinkButton = styled.button`
  display: inline-block;
  appearance: none;
  background-color: transparent;
  border: none;
  color: #c48f5a;
  padding: 3px;
  text-decoration: underline;
  margin-top: 0.7rem;
  &:hover {
    text-decoration: none;
  }

  &:active {
    font-weight: bold;
  }
`;

export const InputFile = styled.input`
  display: none;
`;
