import RootLayout from 'components/root/layout';
import Home from './components/home';
import Counter from './components/counter';
import List from './components/list';
import NotFound from './components/notfound';
import ListToUsers from './components/listtousers';

const routes = [
    { component: RootLayout,
        routes: [
            { path: '/',
                exact: true,
                component: Home
            },
            { path: '/counter',
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