import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { Link } from "../../../components/Link";

interface Props {
  cakePriceUsd?: number;
  isPushed?:boolean
}

const PriceLink = styled.span`
  display: flex;
  align-items: center;

  svg {
    transition: transform 0.3s;
  }
`;

const CakePrice: React.FC<Props> = ({ cakePriceUsd, isPushed }) => {
  return cakePriceUsd ? (
    <PriceLink>
      {isPushed ? 
      <PancakeRoundIcon width="24px" mr="8px" />
      :null}
      <Link
        href={"https://coinmarketcap.com/currencies/spiritswap/"}
        style={{ marginLeft: "5px", textDecoration: "none" }}
        target="_blank"
        color="textSubtle"
        bold
      >{`$${cakePriceUsd.toFixed(3)}`}</Link>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(CakePrice);
