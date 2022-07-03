import React from "react";
import styled from "styled-components";
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';

export default function SidebarOption({ Icon, title, el}) {
  return (
    <SidebarOptionContainer>
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>{el.private ? (<RiGitRepositoryPrivateLine />) : '#'} {title}</span>
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
