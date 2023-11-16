import styled from "styled-components";
import {Button, Skeleton, Typography} from "antd";
import {Swiper} from "swiper/react";

const {Text} = Typography;
export const EditButton = styled(Button)`
  background: lightgray;
`;
export const SwiperWrapper = styled(Swiper)`
  margin-bottom: 16px;

  .swiper-slide:nth-child(2n) {
    width: 36% !important;
    display: flex;
    height: auto;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  width: 100%;

  button {
    flex-grow: 1;
    padding: 4px 0;
    border-radius: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
  }

  button:last-child {
    border-radius: 0 10px 10px 0;
  }
`;

export const TodoWrapper = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 12px 16px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextStyle = styled(Text)`
  margin-bottom: 12px;
`;
export const SkeletonWrapper = styled.div`
  background-color: lightgray;
  border-radius: 10px;
  padding: 12px;

  && li:not(:first-child) {
    margin-top: 12px;
  }
`;

export const SkeletonColumn = styled(Skeleton)`
  margin-bottom: 2px;

  && span {
    width: 64px;
    height: 64px;
  }
`;
