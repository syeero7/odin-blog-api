import { FormEvent, useEffect, useState } from "react";
import { Comment as CommentData } from "../../utils/types";
import { useAuth } from "../AuthProvider";
import styles from "./CommentSection.module.css";
import { Form, Link } from "react-router-dom";

function CommentSection({ comments, isAdmin }: CommentSectionProps) {
  const [editId, setEditId] = useState<null | number>(null);
  const { user } = useAuth();

  const clearEditId = () => {
    if (editId !== null) setEditId(null);
  };

  return (
    <section>
      <header>
        <h2>{`${comments.length > 0 ? comments.length : " "} Comment${
          comments.length > 1 ? "s" : ""
        }`}</h2>

        <CommentCreationForm clearEditId={clearEditId} />
      </header>
      <hr />

      {comments.length ? (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment
                id={comment.id}
                content={comment.content}
                canManageComment={isAdmin || user?.id === comment.authorId}
                isSelected={comment.id === editId}
                onEdit={() => setEditId(comment.id)}
                onCancel={clearEditId}
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

function CommentCreationForm({ clearEditId }: { clearEditId: () => void }) {
  const [showError, toggleShowError] = useShowError();
  const { user } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    clearEditId();

    if (!user) {
      e.preventDefault();
      toggleShowError();
    }
  };

  return (
    <Form method="post" action="comments" onSubmit={handleSubmit}>
      <div className={styles.textareaContainer}>
        <textarea
          name="comment"
          placeholder="Add a comment"
          aria-label="add comment"
          maxLength={300}
          required></textarea>

        <span aria-live="polite" className={styles.error}>
          {showError && (
            <>
              * Please <Link to="/login">login</Link> to leave a comment
            </>
          )}
        </span>
      </div>

      <button type="submit">Comment</button>
    </Form>
  );
}

function Comment({
  id,
  content,
  canManageComment,
  isSelected,
  onEdit,
  onCancel,
}: Omit<CommentProps, "authorId">) {
  const handleSubmit = (e: FormEvent) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      e.preventDefault();
      return;
    }
    onCancel();
  };

  return isSelected ? (
    <CommentUpdateForm id={id} content={content} onCancel={onCancel} />
  ) : (
    <article className={styles.comment}>
      <p>{content}</p>
      {canManageComment && (
        <div className={styles.buttons}>
          <button onClick={onEdit}>Edit</button>
          <Form action={`comments/${id}/delete`} method="delete" onSubmit={handleSubmit}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      )}
    </article>
  );
}

function CommentUpdateForm({ id, content, onCancel }: CommentUpdateFormProps) {
  return (
    <div className={styles.comment}>
      <Form method="put" action={`comments/${id}/update`} onSubmit={onCancel}>
        <div className={styles.textareaContainer}>
          <textarea
            name="comment"
            aria-label="edit comment"
            maxLength={300}
            required
            defaultValue={content}
            autoFocus></textarea>
        </div>

        <div className={styles.buttons}>
          <button type="submit">Update</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

const useShowError = () => {
  const [showError, setShowError] = useState(false);
  const toggleShowError = () => setShowError((prev) => !prev);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        toggleShowError();
      }, 5000);
    }
  }, [showError]);

  return [showError, toggleShowError] as const;
};

interface CommentSectionProps {
  comments: CommentData[];
  isAdmin: boolean;
}

interface CommentProps extends CommentData {
  canManageComment: boolean;
  isSelected: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

type CommentUpdateFormProps = Pick<CommentProps, "id" | "content" | "onCancel">;

export default CommentSection;
