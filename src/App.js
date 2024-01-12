import { useState } from 'react'
import styles from './App.module.sass'

function App () {
  const limit = 200
  const [money, setMoney] = useState(1000)
  const [amount, setAmount] = useState(0)
  const [isGame, setIsGame] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [deka, setDeka] = useState([])
  const [myDeka, setMyDeka] = useState([])
  const [opponentDeka, setOpponentDeka] = useState([])
  const [win, setWin] = useState(null)
  const amounts = [1, 5, 25, 50, 100, 200]

  const changeAmount = newAmount => {
    if (!isGame && limit >= newAmount + amount) {
      setAmount(newAmount + amount)
    }
  }

  const renderFishka = count => (
    <div
      key={count}
      onClick={() => changeAmount(count)}
      className={`${styles.fishka} ${styles[`fishka${count}`]} ${
        limit < count + amount && styles.fishkaNot
      }`}
    ></div>
  )

  const firstMyDekaRandomCart = newDeka => {
    const Deka = [...newDeka]
    const newMyDeka = [...myDeka]
    const index1 = Math.random() * Deka.length
    const number1 = Deka.splice(index1, 1)[0]
    const index2 = Math.random() * Deka.length
    const number2 = Deka.splice(index2, 1)[0]

    if (number1 + number2 > 21) {
      return firstMyDekaRandomCart(newDeka)
    }
    newMyDeka.push(number1)
    newMyDeka.push(number2)
    setDeka(Deka)
    setMyDeka(newMyDeka)
    return Deka
  }

  const firstOpponentDekaRandomCart = newDeka => {
    const Deka = [...newDeka]
    const newOpponentDeka = [...opponentDeka]
    const index1 = Math.random() * Deka.length
    const number1 = Deka.splice(index1, 1)[0]
    const index2 = Math.random() * Deka.length
    const number2 = Deka.splice(index2, 1)[0]

    if (number1 + number2 > 21) {
      return firstOpponentDekaRandomCart(newDeka)
    }
    newOpponentDeka.push(number1)
    newOpponentDeka.push(number2)

    setDeka(Deka)
    setOpponentDeka(newOpponentDeka)
  }

  const startGame = () => {
    setIsGame(true)
    const newDeka = [...deka]
    for (let index = 1; index <= 13; index++) {
      newDeka.push(index)
    }
    firstOpponentDekaRandomCart(firstMyDekaRandomCart(newDeka))
  }

  const randomMyDekaCart = deka => {
    const newDeka = [...deka]
    const newMyDeka = [...myDeka]
    const index = Math.random() * deka.length
    const number = newDeka.splice(index, 1)[0]
    newMyDeka.push(number)

    setDeka(newDeka)
    setMyDeka(newMyDeka)
    let sum = newMyDeka.reduce((a, b) => a + b, 0)
    if (sum > 21) {
      setIsFinish(true)
      setWin(false)
    } else if (sum === 21) {
      setIsFinish(true)
      setWin(true)
    }
  }

  const randomOpponentDekaCart = (deka, opponentDeka) => {
    const newDeka = [...deka]
    const newOpponentDeka = [...opponentDeka]
    const number = Math.random() * newDeka.length
    newOpponentDeka.push(newDeka.splice(number, 1)[0])

    setDeka(newDeka)
    setOpponentDeka(newOpponentDeka)
    let opponentSum = newOpponentDeka.reduce((a, b) => a + b, 0)
    let sum = myDeka.reduce((a, b) => a + b, 0)
    if (opponentSum > 21) {
      setWin(true)
    } else if (opponentSum === sum) {
      setWin(null)
    } else if (opponentSum === 21 || opponentSum > sum) {
      setWin(false)
    } else if (opponentSum < sum) {
      randomOpponentDekaCart(newDeka, newOpponentDeka)
    }
  }

  const againBtn = () => {
    switch (win) {
      case true:
        setMoney(money + amount)
        break
      case false:
        setMoney(money - amount)
        break
      default:
        break
    }
    setAmount(0)
    setIsGame(false)
    setIsFinish(false)
    setDeka([])
    setMyDeka([])
    setOpponentDeka([])
    setWin(false)
  }

  const finish = () => {
    setIsFinish(true)
    let opponentSum = opponentDeka.reduce((a, b) => a + b, 0)
    let sum = myDeka.reduce((a, b) => a + b, 0)
    if (opponentSum > sum) {
      setWin(false)
    } else {
      randomOpponentDekaCart(deka, opponentDeka)
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.background}>
        <img
          src={'/images/background.jpg'}
          alt='background'
          className={styles.backgroundImg}
        />
        <div className={`${styles.text} ${styles.amount1}`}>{limit}</div>
        <div className={`${styles.text} ${styles.amount2}`}>{money}</div>
        <div className={`${styles.text} ${styles.amount3}`}>{amount}</div>

        <div>{amounts.map(amount => renderFishka(amount))}</div>

        {!isGame && amount > 0 && (
          <>
            <div
              onClick={() => setAmount(0)}
              className={`${styles.text} ${styles.clearBtn}`}
            >
              ОБНУЛИТЬ
            </div>
            <div
              onClick={() => startGame()}
              className={`${styles.text} ${styles.startBtn}`}
            >
              СДЕЛКА
            </div>
          </>
        )}

        {isGame && (
          <>
            {!isFinish ? (
              <>
                <div
                  onClick={() => {
                    randomMyDekaCart(deka)
                  }}
                  className={`${styles.text} ${styles.getCart}`}
                >
                  ТАЩИТЬ КАРТУ
                </div>
                <div
                  onClick={() => finish()}
                  className={`${styles.text} ${styles.endGame}`}
                >
                  СТЭНД
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.text} ${styles.win}`}>
                  {win ? 'Победа' : win === false ? 'Поражение' : 'Ничья'}
                </div>
                <div
                  onClick={() => againBtn()}
                  className={`${styles.text} ${styles.againBtn}`}
                >
                  Заново
                </div>
              </>
            )}
            <div className={`${styles.text} ${styles.carts}`}>
              {myDeka.map((cart, index) => (
                <div
                  key={index}
                  className={`${styles.text} ${styles.cart}  ${
                    styles[`cart${index}`]
                  }`}
                >
                  {cart}
                </div>
              ))}
            </div>
            <div
              className={`${styles.text} ${styles.carts} ${styles.opponentCarts}`}
            >
              {opponentDeka.map((cart, index) => {
                if (index > 0 && !isFinish) {
                  return (
                    <div
                      key={index}
                      className={`${styles.text} ${styles.cart} ${
                        styles.opponentCart
                      } ${styles[`cart${index}`]}`}
                    ></div>
                  )
                }

                return (
                  <div
                    key={index}
                    className={`${styles.text} ${styles.cart} ${
                      styles[`cart${index}`]
                    }`}
                  >
                    {cart}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
