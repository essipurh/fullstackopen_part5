const BlogForm = ({blogTitle,handleTitle, author, handleAuthor, url, handleUrl, addBlogPost }) => (
  <>
    <form onSubmit={addBlogPost}>
      <div>
        title
          <input
          type="text"
          value={blogTitle}
          name="BlogTitle"
          onChange={handleTitle}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="Password"
          onChange={handleAuthor}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="Password"
          onChange={handleUrl}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </>  
)

export default BlogForm