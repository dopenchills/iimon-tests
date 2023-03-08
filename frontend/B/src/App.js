import './App.css';
import { useState } from 'react';

const FruitInput = ({onFruitAddition}) => {
  const [inputText, setInputText] = useState("");

  const onTextChange = e => {
    setInputText(e.target.value);
  }

  const onAddButtonClick = () => {
    if (inputText.length !== 0) {
      onFruitAddition(inputText);
      setInputText("");
    }
  }

  return (
    <div>
      <input type="text" value={inputText} onChange={onTextChange} />
      <button onClick={onAddButtonClick}>追加</button>
    </div>
  )
}

const FruitItem = ({children, onDeleteButtonClick}) => {
  return (<li><span onClick={onDeleteButtonClick}>x</span>{children}</li>)
}

const FruitsForm = () => {
  const [fruits, setFruits] = useState(["Apple", "Grape", "Strawberry"]);

  const onFruitAddition = fruitName => {
    setFruits([...fruits, fruitName]);
  }

  const makeOnDeleteButtonClick = index => {
    return () => {
      const newFruits = fruits.filter((_, i) => i !== index)
      setFruits(newFruits);
    }
  }

  return (
    <div>
      <FruitInput onFruitAddition={onFruitAddition} />
      <ul>
        {fruits.map((fruit, index) => {
          return (
              <FruitItem onDeleteButtonClick={makeOnDeleteButtonClick(index)} key={index}>{fruit}</FruitItem>
            )
          }
        )}
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <FruitsForm />
    </div>
  );
}

export default App;
