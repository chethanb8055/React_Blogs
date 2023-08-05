import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
//step-1 creating context
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  //data filling
  async function fetchBlogPosts(page = 1) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    try {
      const result = await fetch(url);
      const data = await result.json();
      setPosts(data.posts)
      setPage(data.page)
      setTotalPages(data.totalPages)
      setPage(data.page);
      // setPosts()
    } catch (error) {
        console.log(error)
        setPage(1)
        setPosts([])
        setTotalPages(null)
    }
    setLoading(false);
  }

  //page Handling
  function handlePageChange(page){
    setPage(page);
    fetchBlogPosts(page)

  }

  const value = {
    // state method and states all are present
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    handlePageChange,
    fetchBlogPosts
  };

  //  step-2 sending value to app(child)
  return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>;
}
