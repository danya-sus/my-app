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

export const getRoutes = (roles?: string[]) => {
    let routes = getDefaultRoutes();

    if (roles) {
        roles
            .filter(
                (role, index, arr) => 
                    arr.findIndex(t => t === role) === index
            ).forEach((e) => {
                routes = [...routes, ...getRoutesByRole(e)]
            }
        )
    }

    return routes;
}

const getDefaultRoutes = () => {
    return [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'register',
            element: <RegisterForm />
        }
    ]
}


const getRoutesByRole = (role: string) => {
    switch (role) {
        case 'Resident': 
            return (getResidentRoutes())
        case 'Commandant': 
            return (getEmployeeRoutes())
        default: return []
    }
}

const getResidentRoutes = () => {
    return [
        {
            path: 'home',
            element: <Home />
        },
        {
            path: 'profile',
            element: <Profile />
        },
        {
            path: 'requests',
            element: <Requests />
        }
    ]
}

const getEmployeeRoutes = () => {
    return [
        {
            path: 'home',
            element: <Home />
        },
        {
            path: 'profile',
            element: <Profile />
        },
        {
            path: 'requests',
            element: <Requests />
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
            path: 'employees',
            element: <Employees />
        },
        {
            path: 'employee/:id',
            element: <Employee />
        },
        {
            path: 'things',
            element: <Things />
        },
        {
            path: 'rooms',
            element: <Blocks />
        }
    ]
}