import { Textarea } from '@mantine/core';
import { useLanguageStore } from '../../../stores/language-store';

interface CommentInputProps {
  commentText: string;
  setCommentText: (commentText: string) => void;
  buttonPressed: boolean;
  setButtonPressed: (buttonPressed: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  getColor: () => string;
}

function CommentInput({
  commentText,
  setCommentText,
  buttonPressed,
  setButtonPressed,
  errorMessage,
  setErrorMessage,
  getColor,
}: CommentInputProps) {
  const { language } = useLanguageStore();

  return (
    <Textarea
      label={language === 'en' ? 'Comment' : 'Kommentar'}
      required
      value={commentText}
      aria-label="Write a comment"
      error={buttonPressed ? errorMessage : null}
      onChange={(event) => {
        setCommentText(event.currentTarget.value);
        setButtonPressed(false);
        setErrorMessage('');
      }}
      styles={{
        input: {
          backgroundColor: getColor(),
        },
      }}
    />
  );
}

export default CommentInput;
