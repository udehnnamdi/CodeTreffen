import TreffenItem from './TreffenItem';
import classes from './TreffenList.module.css';

function TreffenList(props) {
  return (
    <ul className={classes.list}>
      {props.treffen.map((treff) => (
        <TreffenItem
          key={treff.id}
          id={treff.id}
          image={treff.image}
          title={treff.title}
          address={treff.address}
        />
      ))}
    </ul>
  );
}

export default TreffenList;
