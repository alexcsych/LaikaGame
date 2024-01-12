import { useState } from 'react'
import styles from './App.module.sass'

function App () {
  const limit = 200
  const [money, setMoney] = useState(1000)
  const [amount, setAmount] = useState(0)

  const changeAmount = newAmount => {
    if (limit >= newAmount + amount) {
      setAmount(newAmount + amount)
    }
  }

  const amounts = [1, 5, 25, 50, 100, 200]

  const renderFishka = count => (
    <div
      key={count}
      onClick={() => changeAmount(count)}
      className={`${styles.fishka} ${styles[`fishka${count}`]} ${
        limit < count + amount && styles.fishkaNot
      }`}
    ></div>
  )

  return (
    <div className={styles.body}>
      <div className={styles.background}>
        <img
          src={'/images/background.jpg'}
          alt='background'
          className={styles.backgroundImg}
        />
        <div className={styles.amount1}>{limit}</div>
        <div className={styles.amount2}>{money}</div>
        <div className={styles.amount3}>{amount}</div>

        <div>{amounts.map(amount => renderFishka(amount))}</div>

        {amount > 0 && (
          <>
            <div onClick={() => setAmount(0)} className={styles.clearBtn}>
              ОБНУЛИТЬ
            </div>
            <div className={styles.startBtn}>СДЕЛКА</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
