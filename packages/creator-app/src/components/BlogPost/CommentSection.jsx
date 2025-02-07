import { useState } from "react";
import propTypes from "prop-types";
import { Form } from "react-router-dom";

function CommentSection({ comments }) {
  const [editId, setEditId] = useState(null);

  const clearEditId = () => setEditId(null);

  const handleSubmit = (e) => {
    if (editId !== null) clearEditId();
    setTimeout(() => e.target.reset(), 0);
  };

  return (
    <section>
      <header>
        <h2>
          {comments.length > 0 && comments.length} Comment
          {comments.length > 1 && "s"}
        </h2>
        <Form action="comments" method="post" onSubmit={handleSubmit}>
          <textarea
            name="comment"
            placeholder="Add a comment"
            aria-label="add comment"
            maxLength="100"
            required
          ></textarea>
          <button type="submit">Comment</button>
        </Form>
      </header>
      <hr />
      {comments.length ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                id={comment.id}
                content={comment.content}
                editId={editId}
                setEditId={setEditId}
                clearEditId={clearEditId}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </section>
  );
}

CommentSection.propTypes = {
  comments: propTypes.arrayOf(propTypes.object),
};

function Comment({ id, content, editId, setEditId, clearEditId }) {
  return id === editId ? (
    <div>
      <Form
        method="put"
        action={`comments/${id}/update`}
        onSubmit={clearEditId}
      >
        <textarea
          type="text"
          name="comment"
          aria-label="edit comment"
          maxLength="100"
          required
          defaultValue={content}
          autoFocus
        ></textarea>
        <button type="submit">Update</button>
        <button type="button" onClick={clearEditId}>
          Cancel
        </button>
      </Form>
    </div>
  ) : (
    <article>
      <p>{content}</p>
      <div>
        <button onClick={() => setEditId(id)}>Edit</button>
        <Form
          action={`comments/${id}/delete`}
          method="delete"
          onSubmit={(e) => {
            if (!confirm("Are you sure you want to delete this comment?")) {
              e.preventDefault();
            } else {
              clearEditId();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </article>
  );
}

Comment.propTypes = {
  id: propTypes.number.isRequired,
  editId: propTypes.number,
  content: propTypes.string.isRequired,
  setEditId: propTypes.func.isRequired,
  clearEditId: propTypes.func.isRequired,
};

export default CommentSection;
