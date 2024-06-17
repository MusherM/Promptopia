import { useState, useEffect, useRef } from 'react'

const useSearchPosts = (initialSearchText = '') => {
  const [searchText, setSearchText] = useState(initialSearchText)
  const [posts, setPosts] = useState([])
  const timeoutId = useRef(null)

  // 获取所有 prompt
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
  }

  // 根据搜索关键词获取 prompt
  const fetchSearchPosts = async search => {
    const response = await fetch('/api/prompt/search?searchText=' + search)
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 防抖
  useEffect(() => {
    if (searchText.trim()) {
      const newTimeout = setTimeout(() => {
        fetchSearchPosts(searchText)
      }, 1000)
      timeoutId.current = newTimeout
      console.log('set!', newTimeout)
      return () => clearTimeout(newTimeout)
    } else {
      fetchPosts()
      return () => clearTimeout(timeoutId.current)
    }
  }, [searchText])

  const handleSearchChange = e => {
    setSearchText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('clear by submit', timeoutId.current)
    clearTimeout(timeoutId.current)
    fetchSearchPosts(searchText)
  }

  const handleTagClick = tag => {
    setSearchText(tag)
    // 需要等待searchText更新完毕，再清除副作用带来的定时器
    setTimeout(() => {
      console.log('clear by tag', timeoutId.current)
      clearTimeout(timeoutId.current)
    }, 0)
    fetchSearchPosts(tag) // 立即执行搜索
  }

  return {
    searchText,
    posts,
    fetchPosts,
    handleSearchChange,
    handleSubmit,
    handleTagClick
  }
}

export default useSearchPosts
