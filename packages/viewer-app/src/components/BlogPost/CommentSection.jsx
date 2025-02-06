import { useAuth } from "../AuthProvider/AuthProvider";
import { Link, Form } from "react-router-dom";
import propTypes from "prop-types";
import { useState } from "react";
import styles from "./CommentSection.module.css";

function CommentSection({ comments }) {
  const [showError, setShowError] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const { userid } = useAuth();

  const handleSubmit = (e) => {
    setCurrentEditId(null);
    setTimeout(() => e.target.reset(), 0);

    if (!userid) {
      e.preventDefault();
      setShowError((s) => !s);

      setTimeout(() => {
        setShowError((s) => !s);
      }, 5000);
    }
  };

  return (
    <section id="comments">
      <header className={styles.header}>
        <h2>
          {comments.length > 0 && comments.length} Comment
          {comments.length > 1 && "s"}
        </h2>
        <Form method="post" action="comments" onSubmit={handleSubmit}>
          <div className={styles.textareaContainer}>
            <textarea
              name="comment"
              placeholder="Add a comment"
              aria-label="add comment"
              maxLength="100"
              required
            ></textarea>
            {showError && (
              <span aria-live="polite" className={styles.error}>
                * Please <Link>login</Link> to leave a comment
              </span>
            )}
          </div>

          <button type="submit">Comment</button>
        </Form>
      </header>

      <hr />
      {comments.length ? (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                user={userid == comment.authorId}
                id={comment.id}
                content={comment.content}
                currentEditId={currentEditId}
                setCurrentEditId={setCurrentEditId}
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

function Comment({ id, content, user, currentEditId, setCurrentEditId }) {
  const [showEdit, setShowEdit] = useState(false);

  const toggle = () => setShowEdit((e) => !e);

  return showEdit && id === currentEditId ? (
    <div className={styles.comment}>
      <Form method="put" action={`comments/${id}/update`} onSubmit={toggle}>
        <div className={styles.textareaContainer}>
          <textarea
            type="text"
            name="comment"
            aria-label="edit comment"
            maxLength="100"
            required
            defaultValue={content}
            autoFocus
          ></textarea>
        </div>
        <div className={styles.btnContainer}>
          <button name="update" type="submit" className={styles.update}>
            Update
          </button>
          <button type="button" onClick={toggle} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  ) : (
    <article className={styles.comment}>
      <p>{content}</p>
      {user && (
        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              setCurrentEditId(id);
              toggle();
            }}
            className={styles.edit}
          >
            Edit
          </button>
          <Form
            action={`comments/${id}/delete`}
            method="delete"
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to delete this comment?")) {
                e.preventDefault();
              } else {
                setCurrentEditId(null);
              }
            }}
          >
            <button name="delete" type="submit" className={styles.delete}>
              Delete
            </button>
          </Form>
        </div>
      )}
    </article>
  );
}

Comment.propTypes = {
  id: propTypes.number.isRequired,
  content: propTypes.string.isRequired,
  user: propTypes.bool.isRequired,
  currentEditId: propTypes.number,
  setCurrentEditId: propTypes.func.isRequired,
};

export default CommentSection;
