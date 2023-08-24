import classes from "./FuyoClicker.module.css";
import Clicker from './components/clicker';
import Lanes from './components/lanes';
import News from './components/news';
import ReproductionRoom from './components/reproduction-room';
import Shop from './components/shop';

export default function FuyoClicker() {
    return (
        <div className={classes.container}>
            <Clicker className={classes.left} />
            <div className={classes.middle}>
                <News />
                <ReproductionRoom />
                <Lanes />
            </div>
            <Shop className={classes.right} />
        </div>
    );
}
