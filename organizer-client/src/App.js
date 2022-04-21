import {Outlet} from 'react-router-dom';

function App() {
    return (
        <div className='flex flex-row gap-4'>
            <Outlet/>
        </div>
    );
}

export default App;
