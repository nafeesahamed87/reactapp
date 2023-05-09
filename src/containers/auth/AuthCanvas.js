import Styles from './authPage.module.scss'

export default function AuthCanvas(props) {
  return (
    <div className={Styles['main-container']}>
      <div>{props.children}</div>
    </div>
  )
}
