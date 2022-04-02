import React from 'react'
import styled from "styled-components";

export default function Navbar() {
  return (
    <Wrapper>
        <h4>
          Welcome
        </h4>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  padding: 1.5rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
`;