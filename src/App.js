import { useState, useEffect } from 'react'
import Header from './components/Header'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] =useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [isLoggedOut, setIsLoggedOut] = useState(true)
  const [user, setUser] = useState(null)
  const [userDetails, setUserDetails] = useState({})
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON)
      setUserDetails(userLogged)
      setUser(userLogged.token)
      setIsLoggedOut(false)
    }
  }, [])


  const addBlogPost = async (event) => {
    event.preventDefault()
    console.log('creating a new blog post... ', user)
    const newBlog = {
      'url': url,
      'title': blogTitle,
      'author': author
    }
    try {
      const blog = await blogService.create(newBlog, user)
      console.log(blog)
      const updatedBlogList = [blog, ...blogs]
      setBlogs(updatedBlogList)
      setNotification({'type': 'success', 'text':`A new blog ${blog.name} by ${blog.author} added`})
      setTimeout(() => {
        setNotification(null) 
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotification({'type': 'error', 'text':'Unable to add new blog post.'})
      setTimeout(() => {
        setNotification(null) 
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user.token)
      setUserDetails(user)
      setIsLoggedOut(false)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotification({'type': 'error', 'text':'wrong credentials'})
      setTimeout(() => {
        setNotification(null) 
      }, 5000)
    }
  }

  const handleLogOut = () => {
    setIsLoggedOut(true)
    window.localStorage.clear()
  }


  if (isLoggedOut) {
    return (
      <>
        <Header text={'Log into application'} />
        <Notification notification={notification} />
        <Login username={username} password={password} handleLogin={handleLogin} handleUser={({ target }) => setUsername(target.value)} handlePassword={({ target }) => setPassword(target.value)} />
      </>    
  )}

  return (
    <div>
      <Header text={'Blogs'} />
      <Notification notification={notification} />
      {userDetails.name} logged in <button onClick={handleLogOut}>logout</button>
      <Header text={'Create new'} />
      <BlogForm addBlogPost={addBlogPost} blogTitle={blogTitle} handleTitle={({ target }) => setTitle(target.value)} author={author} handleAuthor={({ target }) => setAuthor(target.value)} url={url} handleUrl={({ target }) => setUrl(target.value)} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
      
    </div>
  )
}

export default App