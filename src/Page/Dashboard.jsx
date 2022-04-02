import React from 'react'
import styled from 'styled-components'
import Card from '../component/Card'
import Navbar from '../component/Navbar'
import Pagination from '../component/Pagination'
import Search from '../component/Search'
import { GithubContext } from '../context/context'

export default function Dashboard() {
    const {githubUser} = React.useContext(GithubContext)

  return (
    <main>
        <Navbar/>
        <Search />
        {githubUser !== null && <CardContainerWrapper>
            {githubUser?.map((item, index) => (
                <Card key={index} data={item.data} />
            ))}
        </CardContainerWrapper>}
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