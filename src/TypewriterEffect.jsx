import React from "react";
import sound from './Typewriter.mp3';

const TypewriterEffect = () => {
  const [text, setText] = React.useState("");
  const audioRef = React.useRef(new Audio(sound));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let sentence = data.get("sentence").toString().trim();
    if (!sentence) return;

    setText("You typed: ");

    sentence.split("").forEach((char, index) => {
      setTimeout(() => {
        setText((prevText) => prevText + char);

        // Handle audio playback cleanly
        const audio = audioRef.current;
        audio.pause(); // Stop if currently playing
        audio.currentTime = 0; // Rewind to start
        audio.play().catch((err) => {
          // Handle any auto-play errors gracefully
          console.error("Audio play blocked:", err);
        });

      }, index * 300);
    });
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
      <h1>{text}</h1>
    </div>
  );
};

export default TypewriterEffect;
