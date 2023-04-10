import { useRoutes } from 'react-router-dom';
import LazyLoading from '../components/LazyLoading';
const NotFound = LazyLoading(() => import('./NotFound'));
const AuthOutlet = LazyLoading(() => import('../components/HOC/AuthOutlet'));
const ErorrBoundary = LazyLoading(() =>
    import('../components/HOC/ErrorBoundary')
);
const Home = LazyLoading(() => import('../pages/website'));
const Login = LazyLoading(() => import('../pages/auth/Login'));
const ParkingField = LazyLoading(() => import('../pages/website/parkingField'));
const CreateAccount = LazyLoading(() => import('../pages/auth/createAccount'));
const CreateField = LazyLoading(() => import('../pages/auth/addParkingField'));

const ConfirmCode = LazyLoading(() => import('../pages/website/confirmCode'));

//
const AppRoutes = () => {
    let allRoutes = useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/signin',
            element: <Login />,
        },
        {
            path: '/create-account',
            element: <CreateAccount />,
        },
        {
            path: '/',
            element: <AuthOutlet to="parking-field" />,
            children: [
                {
                    path: 'parking-field',
                    element: <ParkingField />,
                    index: true,
                },
            ],
        },
        {
            path: '/register-lot',
            element: <CreateField />,
        },
        {
            path: '/confirm-code/:pickId',
            element: <ConfirmCode />,
        },
        {
            path: '/error/:codeErr',
            element: <ErorrBoundary />,
        },
        {
            // =======
            // >>>>>>> 74763df8bbd4e67e19856d0a4e6a726ba0362df9
            path: '*',
            element: <NotFound />,
        },
    ]);
    return allRoutes;
};

export default AppRoutes;
