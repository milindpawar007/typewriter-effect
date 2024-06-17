import { useEffect } from "react";
import { useState } from "react";

const TypewriterEffect = () => {
  const [sentence, setSentence] = useState("");
  const [typedSentence, setTypedSentence] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setSentence(data.get("sentence"));
    setTypedSentence("");
  };

  useEffect(() => {
    if (sentence === "") {
      return;
    }
    const letters = Array.from(sentence);
    const typewriterInterval = setInterval(() => {
      if (typedSentence.length === letters.length) {
        // we typed all the letters
        clearInterval(typewriterInterval);
        return;
      }
      // else, type next letter
      const nextLetterIndex = typedSentence.length;
      setTypedSentence(typedSentence + letters[nextLetterIndex]);
    }, 500);

    return () => clearInterval(typewriterInterval);
  }, [sentence, typedSentence]);

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
