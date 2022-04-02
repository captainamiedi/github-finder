import React, { useState } from "react";
import styled from "styled-components";

export default function Card({ data }) {
  const [show, setShow] = useState({ show: false, id: "" });
  const { avatar_url, name, type, html_url, hireable, public_repos, id } = data;
  const handleMouseMove = (id) => {
    setShow({ ...show, show: !show.show, id });
  };
  return (
    <Wrapper
      onMouseEnter={() => handleMouseMove(id)}
      onMouseLeave={() => handleMouseMove(id)}
    >
      <header>
        <img src={avatar_url} alt={name} />
      </header>
      <div className="links">
        <p className="align_text">Username: {name ?? "Not Available"}</p>
      </div>
      {show.id === id && show.show && (
        <div className="links">
          <div>
            <p className="align_text">Type: {type ?? "Not Available"}</p>
            <p className="align_text">
              HireAble: {hireable ? "Yes" : !hireable ? "No" : "Not Available"}{" "}
            </p>
            <p className="align_text">Public Repo: {public_repos}</p>
            <a href={html_url}>{html_url ?? "Not Available"}</a>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-radius: 10px;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  outline: 1px solid grey;
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .align_text {
    text-align: center;
  }
  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
