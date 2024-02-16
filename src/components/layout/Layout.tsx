import scss from './Layout.module.scss';
import { Todo } from './pages/TODO/Todo';

const Layout = () => {
  return (
    <div className={scss.layout}>
      <Todo/>
    </div>
  )
}

export default Layout