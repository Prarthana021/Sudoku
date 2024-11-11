import { useState } from "react";
import FooterToolbar from "./components/shared/FooterToolbar";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import { SudokuBoardProvider } from "./components/providers/board-provider";

function Home() {
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  const [currentGameId, setCurrentGameId] = useLocalStorage("currentGameId", "");
  const [addNoteMode, setAddNoteMode] = useState(false);

  return (
    <SudokuBoardProvider size={boardDimension} currentGameId={currentGameId}>
      <div data-testid="navbar">
        <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} setCurrentGameId={setCurrentGameId} />
      </div>
      <div data-testid="content">
        <Content
          boardDimension={boardDimension}
          setBoardDimension={setBoardDimension}
          difficulty={difficulty}
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          addNoteMode={addNoteMode}
          setAddNoteMode={setAddNoteMode}
        />
      </div>
      <div data-testid="footerToolbar">
        <FooterToolbar currentGameId={currentGameId} addNoteMode={addNoteMode} setAddNoteMode={setAddNoteMode} />
      </div>
    </SudokuBoardProvider>
  );
}

export default Home;
