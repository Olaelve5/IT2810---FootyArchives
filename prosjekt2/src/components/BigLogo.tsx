import classes from '../styles/BigLogo.module.css';

export default function BigLogo() {
  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <h1 className={classes.headerGreen}>Footy</h1>
        <h1 className={classes.header}>Archives</h1>
      </div>
      <p className={classes.subHeader}>Discover and explore international matches from 1872 to 2024. </p>
    </div>
  );
}
