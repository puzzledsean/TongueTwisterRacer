import Home from './Home'
import Join from './Join'
import Create from './Create'
import Lobby from './Lobby'
import Grid from './Grid'
import { fetchPopularRepos } from './api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/join',
    exact: true,
    component: Join,
  },
  {
    path: '/create',
    exact: true,
    component: Create,
  },
  {
    path: '/lobby/:id',
    component: Lobby,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes