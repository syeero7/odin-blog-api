import { useState } from "react";
import propTypes from "prop-types";
import { Form } from "react-router-dom";
import styles from "./CommentSection.module.css";

function CommentSection({ comments }) {
  const [editId, setEditId] = useState(null);

  const clearEditId = () => setEditId(null);

  const handleSubmit = (e) => {
    if (editId !== null) clearEditId();
    setTimeout(() => e.target.reset(), 0);
  };

  return (
    <section>
      <header className={styles.header}>
        <h2>
          {comments.length > 0 && comments.length} Comment
          {comments.length > 1 && "s"}
        </h2>
        <Form action="comments" method="post" onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            name="comment"
            placeholder="Add a comment"
            aria-label="add comment"
            maxLength="300"
            required
          ></textarea>
          <button type="submit">Comment</button>
        </Form>
      </header>
      <hr />
      {comments.length ? (
        <ul className={styles.list}>
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
    <div className={styles.comment}>
      <Form
        method="put"
        action={`comments/${id}/update`}
        onSubmit={clearEditId}
      >
        <textarea
          className={styles.textarea}
          type="text"
          name="comment"
          aria-label="edit comment"
          maxLength="300"
          required
          defaultValue={content}
          autoFocus
        ></textarea>

        <div className={styles.buttons}>
          <button type="submit" className={styles.update}>
            Update
          </button>
          <button type="button" onClick={clearEditId} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  ) : (
    <article className={styles.comment}>
      <p>{content}</p>
      <div className={styles.buttons}>
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
