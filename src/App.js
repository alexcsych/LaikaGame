import { useEffect, useState } from 'react'
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
  const amounts = [1, 5, 25, 50, 100, 200]

  useEffect(() => {
    console.log('deka,myDeka,opponentDeka :>> ', deka, myDeka, opponentDeka)
  }, [deka, myDeka, opponentDeka])

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
    console.log('number1 :>> ', number1)
    const index2 = Math.random() * Deka.length
    const number2 = Deka.splice(index2, 1)[0]
    console.log('number2 :>> ', number2)

    if (number1 + number2 > 21) {
      return firstMyDekaRandomCart(newDeka)
    }
    newMyDeka.push(number1)
    newMyDeka.push(number2)
    console.log('Deka :>> ', Deka)
    setDeka(Deka)
    setMyDeka(newMyDeka)
    return Deka
  }

  const firstOpponentDekaRandomCart = newDeka => {
    const Deka = [...newDeka]
    const newOpponentDeka = [...opponentDeka]
    const index1 = Math.random() * Deka.length
    const number1 = Deka.splice(index1, 1)[0]
    console.log('number1 :>> ', number1)
    const index2 = Math.random() * Deka.length
    const number2 = Deka.splice(index2, 1)[0]
    console.log('number2 :>> ', number2)

    if (number1 + number2 > 21) {
      return firstOpponentDekaRandomCart(newDeka)
    }
    console.log('Deka :>> ', Deka)
    newOpponentDeka.push(number1)
    newOpponentDeka.push(number2)

    setDeka(Deka)
    setOpponentDeka(newOpponentDeka)
  }

  const startGame = () => {
    setIsGame(true)
    const newDeka = [...deka]
    for (let index = 1; index <= 21; index++) {
      newDeka.push(index)
    }
    console.log('newDeka :>> ', newDeka)
    firstOpponentDekaRandomCart(firstMyDekaRandomCart(newDeka))
    console.log('myDeka: ', myDeka)
    console.log('opponentDeka: ', opponentDeka)
  }

  const randomMyDekaCart = deka => {
    console.log('deka :>> ', deka)
    const newDeka = [...deka]
    console.log('myDeka :>> ', myDeka)
    const newMyDeka = [...myDeka]
    const index = Math.random() * deka.length
    const number = newDeka.splice(index, 1)[0]
    console.log('number :>> ', number)
    newMyDeka.push(number)

    setDeka(newDeka)
    setMyDeka(newMyDeka)
    console.log('newDeka :>> ', newDeka)
    console.log('newMyDeka :>> ', newMyDeka)
  }

  // const randomOpponentDekaCart = deka => {
  //   const newDeka = [...deka]
  //   const newOpponentDeka = [...opponentDeka]
  //   const number = Math.random() * deka.length
  //   newOpponentDeka.push(newDeka.splice(number, 1)[0])

  //   setDeka(newDeka)
  //   setMyDeka(newOpponentDeka)
  //   console.log('newOpponentDeka :>> ', newOpponentDeka)
  // }

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
            <div
              onClick={() => {
                console.log('myDeka :>> ', myDeka)
                randomMyDekaCart(deka)
              }}
              className={`${styles.text} ${styles.getCart}`}
            >
              ТАЩИТЬ КАРТУ
            </div>
            <div
              onClick={() => setIsFinish(true)}
              className={`${styles.text} ${styles.endGame}`}
            >
              СТЭНД
            </div>
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
