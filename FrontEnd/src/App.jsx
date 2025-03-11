// import { useEffect, useState } from "react";
// import "./App.css";
// import "prismjs/themes/prism-tomorrow.css";
// import Prism from "prismjs";
// import axios from "axios";
// import Markdown from "react-markdown";
// import "highlight.js/styles/github-dark.css";
// import { EditorView } from "@codemirror/view";
// import { javascript } from "@codemirror/lang-javascript";
// import { oneDark } from "@codemirror/theme-one-dark";
// import CodeMirror from "@uiw/react-codemirror";

// function App() {
//   const [code, setCode] = useState(`function sum() { return 1 + 1; }`);
//   const [review, setReview] = useState("");
//   const [error, setError] = useState(""); // Store error messages

//   useEffect(() => {
//     Prism.highlightAll();
//   }, []);

//   async function reviewCode() {
//     try {
//       setError(""); // Clear previous errors
//       const response = await axios.post(
//         "https://code-reviewer-backend-sigma.vercel.app/ai/get-review",
//         { code },
//         { headers: { "Content-Type": "application/json" } } // Ensure correct headers
//       );
//       setReview(response.data);
//     } catch (err) {
//       console.error("Error fetching review:", err);
//       setError("Failed to fetch review. Check the console for details.");
//     }
//   }

//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <CodeMirror
//               value={code}
//               extensions={[javascript(), EditorView.lineWrapping]}
//               theme={oneDark}
//               onChange={(value) => setCode(value)}
//               basicSetup={{
//                 lineNumbers: false,
//                 highlightActiveLineGutter: false,
//               }}
//               style={{
//                 fontFamily: '"Fira Code", "Fira Mono", monospace',
//                 fontSize: "16px",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%",
//                 background: "transparent",
//                 color: "#ffffff",
//                 border: "none",
//                 outline: "none",
//                 caretColor: "white",
//                 whiteSpace: "pre-wrap",
//                 wordBreak: "break-word",
//               }}
//             />
//           </div>

//           <div onClick={reviewCode} className="review">
//             Review
//           </div>
//         </div>

//         <div className="right">
//           {error ? <p style={{ color: "red" }}>{error}</p> : <Markdown>{review}</Markdown>}
//         </div>
//       </main>
//     </>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import "highlight.js/styles/github-dark.css";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirror from "@uiw/react-codemirror";

function App() {
  const [code, setCode] = useState(`function sum() { return 1 + 1; }`);
  const [review, setReview] = useState("");
  const [error, setError] = useState(""); // Store error messages

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setError(""); // Clear previous errors
      const response = await axios.post(
        "http://localhost:8080/ai/get-review",
        { code },
        { 
          headers: { "Content-Type": "application/json" }, 
          withCredentials: true // Allow cookies/auth headers to be sent
        }
      );
      setReview(response.data);
    } catch (err) {
      console.error("Error fetching review:", err);
      setError("Failed to fetch review. Check the console for details.");
    }
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
                lineNumbers: false,
                highlightActiveLineGutter: false,
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

          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        <div className="right">
          {error ? <p style={{ color: "red" }}>{error}</p> : <Markdown>{review}</Markdown>}
        </div>
      </main>
    </>
  );
}

export default App;
