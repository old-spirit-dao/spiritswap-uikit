import React from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../../components/Svg";
import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import { MenuBottomEntry, LinkBottomLabel } from "./MenuBottomEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";
import { BadgeNewIcon } from "../icons";
import CakePrice from "./CakePrice";
import SocialLinks from "./SocialLinks";
import { PRICE_ENTRY_HEIGHT } from "../config";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
  showMenu?: boolean
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Price = styled.div`
height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${PRICE_ENTRY_HEIGHT}px;
  //padding: 0 8px;
  border-top: 1px solid #42BE71;
  border-bottom: 1px solid #42BE71;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  margin-top: 72px;
`;

const Div = styled.div`
 height: 43px;
 margin: 40px 5px 25px 5px;

`;

const rotate = keyframes`
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(8px, 0); }
    100%   { transform: translate(0, -0px); }  
  }
`;
const NewIcon = styled(BadgeNewIcon)`
  position: absolute;
  left: 155px;
  width: 40px;
  margin-right: 45px;
  animation: ${rotate} 6s infinite;
`;
const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const BottomContainer = styled.div`
  flex-direction:column;
  margin-top: 45%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links, cakePriceUsd }) => {
  const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="8px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
        const inSpiritLinks = entry.label === "inSpirit" || entry.label === "Boosted Farms" ? "inSpirit" : "noInSpirit";

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;

          return (
            <>
              <BottomContainer>
                {/*   <Accordion
                key={entry.label}
                isPushed={isPushed}
                pushNav={pushNav}
                icon={iconElement}
                label={entry.label}
                initialOpenState={initialOpenState}
                className={calloutClass}
                inSpirit={inSpiritLinks}
              > */}

                {isPushed &&
                  entry.items.map((item) => (
                    <MenuBottomEntry
                      key={item.href}
                      secondary
                      isActive={item.href === location.pathname}
                      onClick={handleClick}
                      inSpirit={inSpiritLinks}
                    >
                      <MenuLink href={item.href} target={item.target}>
                        {item.label}
                      </MenuLink>
                    </MenuBottomEntry>
                  ))}
                {/* </Accordion> */}
              </BottomContainer>
            </>
          );
        }
        return (
          <MenuEntry
            key={entry.label}
            isActive={entry.href === location.pathname}
            className={calloutClass}
            inSpirit={inSpiritLinks}
          >
            <MenuLink href={entry.href} target={entry.target} onClick={handleClick}>
              <MenuWrapper>
                {iconElement}
                <LinkLabel isPushed={isPushed} inSpirit={inSpiritLinks}>
                  {entry.label}{" "}
                </LinkLabel>
                {entry.label === "Portfolio" ||
                  entry.label === "inSpirit" ||
                  entry.label === "Boosted Farms" ||
                  entry.label === "IDO" ||
                  entry.label === "Lend/Borrow" ? (
                  <NewIcon />
                ) : null}
              </MenuWrapper>
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
