import React from 'react';
import { renderRoutes } from 'react-router-config';
//import Counter from '../components/Counter';

// class App extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return (
//             <div>
//                 {renderRoutes(props.route.routes)}
//             </div>
//         );
//     }
// }

const App = (props) => (
    <div>
        {renderRoutes(props.route.routes)}
    </div>
);


export default App;