import classes from "./Wordle.module.css";

const ErrorMessage: React.FC = () => {
  return <div className={classes.error}> Invalid Word </div>;
};

export default ErrorMessage;
