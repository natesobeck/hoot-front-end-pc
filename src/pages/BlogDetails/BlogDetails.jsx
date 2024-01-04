// npm modules
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

// components
import Loading from "../../components/Loading/Loading"
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo"
import NewComment from "../../components/NewComment/NewComment"
import Comments from "../../components/Comments/Comments"

// services
import * as blogService from '../../services/blogService'

// css
import styles from './BlogDetails.module.css'

const BlogDetails = (props) => {
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)

  const handleAddComment = async (commentFormData) => {
    const newComment = await blogService.createComment(blogId, commentFormData)
    setBlog({...blog, comments: [...blog.comments, newComment]})
  }

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.show(blogId)
      setBlog(data)
    }
    fetchBlog()
  }, [blogId])

  if (!blog) return <Loading />

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{blog.category.toUpperCase()}</h3>
          <h1>{blog.title}</h1>
          <span>
            <AuthorInfo content={blog} />

            {blog.author._id === props.user.profile &&
              <>
                <Link to={`/blogs/${blogId}/edit`} state={blog}>Edit</Link>
                <button onClick={() => props.handleDeleteBlog(blogId)}>Delete</button>
              </>
            }

          </span>
        </header>
        <p>{blog.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
        <NewComment handleAddComment={handleAddComment} />
        <Comments comments={blog.comments} user={props.user}/>
      </section>
    </main>
  )
}

export default BlogDetails