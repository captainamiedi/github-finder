import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [error, setError] = useState({ show: false, msg: "" });
    const [githubUser, setGithubUser] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [users, setUsers] = useState('')

    const toggleError = (show = false, msg = "") => {
        setError({ show, msg });
    }

    const searchUser = async () => {
        try {
            toggleError()
            const resp = await axios.get(`https://api.github.com/search/users?q=${users}&page=1`)
            setTotalCount(resp.data.total_count)
                let requests = resp.data.items.map(item => axios.get(item.url))
                Promise.all(requests)
                .then(responses => setGithubUser(responses)).catch(err => {
                    toast.error(err.response.data.message)
                    toggleError(true, err.response.data.message)
                })
        } catch (error) {
            toast.error(error.response.data.message)
            toggleError(true, error.response.data.message)
        }

    }

    const handleClickPagination = async (page) => {
        try {
            toggleError()
            const resp = await axios.get(`https://api.github.com/search/users?q=${users}&page=${page}`)
            setTotalCount(resp.data.total_count)
                let requests = resp.data.items.map(item => axios.get(item.url))
                Promise.all(requests)
                .then(responses => setGithubUser(responses)).catch(err => {
                    toast.error(err.response.data.message)
                    toggleError(true, err.response.data.message)
                })
        } catch (error) {
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
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubContext, GithubProvider };