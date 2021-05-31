import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Code Treffen</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Treffen</Link>
          </li>
          <li>
            <Link href='/new-treffen'>Add New Treffen</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
