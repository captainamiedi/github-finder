import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const GithubContext = React.createContext();
const baseUrl = 'https://api.github.com/search/users';

const GithubProvider = ({ children }) => {
    const [error, setError] = useState({ show: false, msg: "" });
    const [githubUser, setGithubUser] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [users, setUsers] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toggleError = (show = false, msg = "") => {
        setError({ show, msg });
    }

    const searchUser = async () => {
        try {
            toggleError()
            setIsLoading(true)
            const resp = await axios.get(`${baseUrl}?q=${users}&page=1`)
            setTotalCount(resp.data.total_count)
            if(resp.data.items.length > 0) {
                let requests = resp.data.items.map(item => axios.get(item.url))
                Promise.all(requests)
                .then(responses => setGithubUser(responses)).catch(err => {
                    toast.error(err.response.data.message)
                    toggleError(true, err.response.data.message)
                })
            } else {
                setGithubUser([])
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message)
            toggleError(true, error.response.data.message)
        }

    }

    const handleClickPagination = async (page) => {
        try {
            toggleError()
            setIsLoading(true)
            const resp = await axios.get(`${baseUrl}?q=${users}&page=${page}`)
            setTotalCount(resp.data.total_count)
                let requests = resp.data.items.map(item => axios.get(item.url))
                Promise.all(requests)
                .then(responses => setGithubUser(responses)).catch(err => {
                    toast.error(err.response.data.message)
                    toggleError(true, err.response.data.message)
                })
                setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message)
            toggleError(true, error.response.data.message)
        }
    }
    return (
        <GithubContext.Provider value={{
            error,
            searchUser,
            githubUser,
            totalCount,
            users,
            setUsers,
            handleClickPagination,
            isLoading
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubContext, GithubProvider };