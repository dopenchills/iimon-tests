import { useState } from 'react';
import './FruitsForm.css';

const FruitInput = ({onFruitAddition}) => {
  const [inputText, setInputText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const onTextChange = e => {
    setInputText(e.target.value);
  }

  const onAddButtonClick = () => {
    if (inputText.length !== 0) {
      onFruitAddition(inputText);
      setInputText("");
    }
  }

  const onKeyDownInInput = e => {
    if (e.key === "Enter" && !isComposing) {
      onAddButtonClick()
    }
  }

  return (
    <div className='fruit-input'>
      <input
        type="text"
        value={inputText}
        onChange={onTextChange}
        onKeyDown={onKeyDownInInput}
        onCompositionStart={() => {setIsComposing(true)}}
        onCompositionEnd={() => {setIsComposing(false)}}
        className='fruit-input-text' />
      <button onClick={onAddButtonClick} className='fruit-input-button'>追加</button>
    </div>
  )
}

const FruitItem = ({children, onDeleteButtonClick}) => {
  return (
    <li className='fruit-item'>
      <div onClick={onDeleteButtonClick} className='fruit-item-delete'>x</div>
      <div className='fruit-item-name'><div className='fruit-item-name-text'>{children}</div></div>
    </li>
  )
}

const FruitItemList = ({fruits, setFruits}) => {
  const makeOnDeleteButtonClick = index => {
    return () => {
      const newFruits = fruits.filter((_, i) => i !== index)
      setFruits(newFruits);
    }
  }

  return (
    <ul className='fruit-item-list'>
      {fruits.map((fruit, index) => {
        return (
            <FruitItem onDeleteButtonClick={makeOnDeleteButtonClick(index)} key={index}>{fruit}</FruitItem>
          )
        }
      )}
    </ul>
  )
}

const FruitsForm = ({className}) => {
  const [fruits, setFruits] = useState(["Apple", "Grape", "Strawberry"]);

  const onFruitAddition = fruitName => {
    setFruits([...fruits, fruitName]);
  }

  return (
    <div className={`fruits-form ${className}`}>
      <FruitInput onFruitAddition={onFruitAddition} />
      <FruitItemList fruits={fruits} setFruits={setFruits} />
    </div>
  )
}

export default FruitsForm;
