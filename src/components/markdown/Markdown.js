import React from "react";
import ReactMarkdown from "react-markdown";

export default function Markdown() {
  const mark = `<p align="center">
    <img src="https://zupimages.net/up/22/06/zyj3.gif" alt="Sublime's custom image"/>
  </p>
  
  # Hey! 👋
  <p style="display: flex">

  </p>
  <font size="1">Moi c'est <b>Anthony cory</b>, je suis un développeur qui cherche à résoudre vos besoin. j'ai la passion d'apprendre et de partager mes connaissances</font>
  
  
  #### Language et framework
  ![](https://st2.depositphotos.com/1001311/5495/i/600/depositphotos_54959245-stock-photo-golden-letter-c.jpg=100x200)
  [<img src="https://st2.depositphotos.com/1001311/5495/i/600/depositphotos_54959245-stock-photo-golden-letter-c.jpg" width="250"/>](image.png)
`;

  return (
    <div
      style={{
        width: "300px",
        height: "100%",
      }}
    >
      <ReactMarkdown children={mark} skipHtml={true}>
        {/* # Hello, *world*! */}
      </ReactMarkdown>
    </div>
  );
}
