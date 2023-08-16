import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong creds"')
      //setErrorMessage('wrong credentials')
      //setTimeout(() => {
        //setErrorMessage(null)
      //}, 5000)
    }
  }
  //
  //

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Login username={username} password={password} handleLogin={handleLogin} handleUser={({ target }) => setUsername(target.value)} handlePassword={({ target }) => setPassword(target.value)} />
      
    </div>
  )
}

export default App