import React from 'react'
import styled from 'styled-components'
import Card from '../component/Card'
import Navbar from '../component/Navbar'
import Pagination from '../component/Pagination'
import Search from '../component/Search'
import { GithubContext } from '../context/context'

export default function Dashboard() {
    const {githubUser, isLoading} = React.useContext(GithubContext)

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src="https://raw.githubusercontent.com/captainamiedi/react-search-github-users/main/src/images/preloader.gif" className='loading-img' alt="loading" />
      </main>
    )
  }
  return (
    <main>
        <Navbar/>
        <Search />
        {githubUser !== null && <CardContainerWrapper>
            {githubUser?.map((item, index) => (
                <Card key={index} data={item.data} />
            ))}
        </CardContainerWrapper>}
        {githubUser?.length === 0 && <NotFoundContainer>No User Found</NotFoundContainer>}
        <Pagination />
    </main>
  )
}

const CardContainerWrapper = styled.div`
display: grid;
grid-template-columns: auto auto auto;
grid-gap: 15px;
padding: 0px 6rem;
@media (max-width: 768px) {
    grid-template-columns: auto;
    padding: 0px 1rem;
}
`
const NotFoundContainer = styled.h4`
  display: flex;
  justify-content: center;
  font-weight: bolder;
  padding-top: 5rem;
  @media (max-width: 768px) {
    padding-top: 2rem
  }
`