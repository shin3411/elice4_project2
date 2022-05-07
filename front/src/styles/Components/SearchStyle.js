import styled from "styled-components";
import { Button } from "styles/Components/CommonStyle";

export const SearchContainerBox = styled.form`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 76px;
  margin: 25px auto;
`;

export const SearchButton = styled(Button)`
  width: 60px;
  height: 38px;
  margin-top: 16px;
`;

export const SearchInput = styled.input`
  border: solid 2px #c99c6e;
  border-radius: 8px;
  width: 90%;
  height: 22px;
  font-size: 1.3rem;
  padding: 6px;
`;

export const SearchSelect = styled.select`
  border: solid 2px #c99c6e;
  border-radius: 8px;
  width: 100px;
  height: 50%;
  font-size: 1.3rem;
  margin: 16px 10px 0 0;
`;

export const InputBox = styled.div`
  margin-top: 16px;
  position: relative;
`;

export const DropDownBox = styled.ul`
  display: block;
  width: 92%;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
  position: absolute;
`;

export const DropDownItem = styled.li`
  padding: 0 16px;
  font-size: 1.1rem;

  &.selected {
    background-color: lightgray;
  }
`;
