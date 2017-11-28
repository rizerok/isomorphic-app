//import App from './containers/App';
import RootLayout from 'components/root/layout';
import Counter from './components/counter/Counter';
import List from './components/list';
import NotFound from './components/notfound';
import ListToUsers from './components/listtousers';

const routes = [
    { component: RootLayout,
        routes: [
            { path: '/',
                exact: true,
                component: Counter
            },
            { path: '/home',
                component: Counter
            },
            { path: '/list',
                component: ListToUsers
            },
            { path: '/users',
                component: List
            },
            {
                path:'*',
                component:NotFound
            }
        ]
    }
];

export default routes;