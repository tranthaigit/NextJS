import styles from "./banner.module.css"

export const Banner = (props) => {
  return <div className={styles.container}>
    <h1 className={styles.title}>
      <span className={styles.title1}>Coffee</span>
      <span className={styles.title2}>Shop</span>
    </h1>
    <p className={styles.subTitle}>Discovery your local coffee shops !</p>
    <button className={styles.button} onClick={props.handleOnClick}>{props.buttonText}</button>
  </div>
}