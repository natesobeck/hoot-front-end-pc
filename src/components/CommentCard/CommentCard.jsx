import { Link } from "react-router-dom"
import AuthorInfo from "../AuthorInfo/AuthorInfo"

const CommentCard = (props) => {
  return (
    <article>
      <header>
        <span>
          <AuthorInfo content={props.comment} />
          {props.comment.author._id === props.user.profile &&
            <>
              <Link to={`/blogs/${props.blogId}/comments/${props.comment._id}`} state={props.comment}>
                EDIT
              </Link>
              <button>DELETE</button>
            </>
          }
        </span>
      </header>
      <p>{props.comment.text}</p>
    </article>
  )
}

export default CommentCard