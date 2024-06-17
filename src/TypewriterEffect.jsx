import { useCallback, useEffect, useRef, useState } from "react";

const TypewriterEffect = () => {
  const [typedSentence, setTypedSentence] = useState("");
  const [typewriterIntervalId, setTypewriterIntervalId] = useState(null);
  const savedCallback = useRef();

  // start the interval and save its id,
  // so we can stop it once all letters are typed
  const startTyping = (sentence) => {
    setTypedSentence("");
    const typewriterIntervalId = setInterval(() => {
      savedCallback.current(sentence);
    }, 500);
    setTypewriterIntervalId(typewriterIntervalId);
  };

  // stop the interval
  const stopTyping = useCallback(() => {
    clearInterval(typewriterIntervalId);
    setTypewriterIntervalId(null);
  }, [typewriterIntervalId]);

  const typeNextLetter = useCallback(
    (sentence) => {
      const letters = Array.from(sentence);
      if (typedSentence.length === letters.length) {
        // we typed all the letters
        stopTyping();
        return;
      }
      // else, type next letter
      const nextLetterIndex = typedSentence.length;
      setTypedSentence(typedSentence + letters[nextLetterIndex]);
    },
    [typedSentence, stopTyping]
  );

  useEffect(() => {
    savedCallback.current = typeNextLetter;
  }, [typeNextLetter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    startTyping(data.get("sentence"));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          name="sentence"
          placeholder="Type a sentence"
          style={{ width: "300px" }}
        />
        <button type="submit">Display with typewriter effect</button>
      </form>
      {typedSentence && <p>You typed {typedSentence}</p>}
    </div>
  );
};

export default TypewriterEffect;
