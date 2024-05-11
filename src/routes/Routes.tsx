import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Residents from "../pages/Residents";
import Resident from "../pages/Resident";
import Profile from "../pages/Profile";
import Things from "../pages/Things";
import Requests from "../pages/Requests";
import Employees from "../pages/Employees";
import RegisterForm from "../components/auth/RegisterForm";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Employee from "../pages/Employee";
import Blocks from "../pages/Blocks";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'residents',
                element: <Residents />
            },
            {
                path: 'residents/:id',
                element: <Resident />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'things',
                element: <Things />
            },
            {
                path: 'requests',
                element: <Requests />
            },
            {
                path: 'employees',
                element: <Employees />
            },
            {
                path: 'employee/:id',
                element: <Employee />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <RegisterForm />
            },
            {
                path: 'rooms',
                element: <Blocks />
            }
        ]
    }
])

export const routerByRole = (role: string) => {
    return createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <RegisterForm />
                }
            ].concat(get(role)!)
        }
    ])
}

function get(role: string) {
    switch (role) {
        case 'resident' :
            return getResidentRoutes;
        case 'employee' :
            return getEmployeeRoutes;
    }
}

const getResidentRoutes = [
    {
        path: 'home',
        element: <App />
    },
    {
        path: 'profile',
        element: <Profile />
    },
    {
        path: 'requests',
        element: <Requests />
    },
];

const getEmployeeRoutes = [
    {
        path: 'home',
        element: <Home />
    },
    {
        path: 'residents',
        element: <Residents />
    },
    {
        path: 'residents/:id',
        element: <Resident />
    },
    {
        path: 'profile',
        element: <Profile />
    },
    {
        path: 'things',
        element: <Things />
    },
    {
        path: 'requests',
        element: <Requests />
    },
    {
        path: 'employees',
        element: <Employees />
    },
    {
        path: 'employee/:id',
        element: <Employee />
    }
]