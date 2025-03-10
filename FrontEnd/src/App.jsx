import { useEffect, useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";

function App() {
  const [code, setCode] = useState(`function sum() { return 1 + 1; }`);
  const [review, setreview] = useState(``)
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviwecode(){
    const response= await axios.post('http://localhost:8080/ai/get-review',{ code })
   setreview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <CodeMirror
              value={code}
              extensions={[javascript(), EditorView.lineWrapping]}
              theme={oneDark}
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: false, // Removes the "1" on the side
                highlightActiveLineGutter: false, // Removes highlight from the left side
              }}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: "16px",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                background: "transparent",
                color: "#ffffff",
                border: "none",
                outline: "none",
                caretColor: "white",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            />
          </div>

          <div 
          onClick={reviwecode}
          className="review">Review</div>
        </div>

        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
// backend server (default express server) cannot share your resources with anyone 
// means don't even share resources with frontend 
// if you want server to share resources with backend then
// you have to setup an packages. that package name is "CORS"


// to get a review in a good manner we can use 
// package "markdown"


// rehype-highlight ek rehype plugin hai jo Markdown files ke andar code 
// blocks ka syntax highlight karne ke liye use hota hai. Yeh internally 
// highlight.js ka use karta hai taaki code ko alag-alag colors aur
//  styles mein dikhaya ja sake.
