import styled from "styled-components";
import { img } from "utils/imgImport";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  z-index: 9999;
  background-image: url(${img.leafLeftHeader}), url(${img.leafRightHeader});
  background-repeat: no-repeat;
  background-position: left, right;
  background-size: auto 100%, auto 120%;
  background-color: #f5efea;
`;

export const HeaderWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 20px;
  position: relative;
`;

export const LogoImg = styled.img`
  flex: 0;
  width: 120px;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    width: 180px;
  }
`;

export const Navigation = styled.div`
  margin-left: auto;
  font-weight: lighter;
`;

export const NavList = styled.span`
  cursor: pointer;
  margin-right: 20px;
  transition: all 0.1s linear;
  box-sizing: border-box;
  &:hover {
    color: #c48f5a;
  }
  &:last-child {
    margin-right: 0;
  }

  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const LogOutBtn = styled.span`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 0.8rem;
  color: #868e96;
  transition: all 0.1s linear;
  &:hover {
    color: #312517;
  }
`;
