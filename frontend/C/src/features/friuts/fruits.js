import { useSelector, useDispatch } from 'react-redux';
import {
  moveToLeft,
  moveToRight,
  selectLeftFruits,
  selectRightFruits,
} from './fruitsSlice';
import styles from './fruits.module.css';


export const LeftList = () => {
  const leftFruits = useSelector(selectLeftFruits);
  const dispatch   = useDispatch();

  return (
    <div className={styles.pane}>
      <ul className={styles.list}>
        {leftFruits.map((fruit, index) => <li key={index} className={styles.item}>{fruit}</li>)}
      </ul>
      <button onClick={() => {dispatch(moveToRight())}} className={styles.button}>右へ移動</button>
    </div>
  )
}

export const RightList = () => {
  const rightFruits = useSelector(selectRightFruits);
  const dispatch    = useDispatch();
  return (
    <div className={styles.pane}>
      <ul className={styles.list}>
        {rightFruits.map((fruit, index) => <li key={index} className={styles.item}>{fruit}</li>)}
      </ul>
      <button onClick={() => {dispatch(moveToLeft())}} className={styles.button}>左へ移動</button>
    </div>
  )
}

export const FullFruitsList = ({className}) => {
  return (
    <div className={`${styles.fullFruitsList} ${className}`}>
      <LeftList />
      <RightList />
    </div>
  )
}
