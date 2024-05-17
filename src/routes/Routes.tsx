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
import ResidentRoom from "../pages/ResidentRoom";

// Navbar Routes
export const getRoutesForNavbar = (roles?: string[]) => {
    let routes: {path: string, name: string}[];
    routes = [];

    if (roles) {
        roles
            .filter(
                (role, index, arr) => 
                    arr.findIndex(t => t === role) === index
            ).forEach((e) => {
                routes = [...routes, ...(getRoutesByRoleForNavbar(e))]
            }
        )
    }

    return routes;
}

const getRoutesByRoleForNavbar = (role: string) => {
    switch (role) {
        case 'Resident': 
            return (getResidentRoutesForNavbar())
        case 'Commandant': 
            return (getCommandantRoutesForNavbar())
        case 'Fixer' : 
            return (getFixerRoutesForNavbar())
        case 'StudantCouncil' : 
            return (getStudentCouncilRoutesForNavbar())
        case 'SecurityGuard' : 
            return (getSecurityGuearRoutesForNavbar())
        case 'DutyOfficer' :
            return (getDutyOfficerRoutesForNavbar())
        case 'SupplyManager' :
            return (getSupplyManagerRoutesForNavbar())
        default: return []
    }
}

const getResidentRoutesForNavbar = () => {
    return [
        {
            path: 'home',
            name: "Дом"
        },
        {
            path: 'profile',
            name: 'Профиль'
        },
        {
            path: 'requests',
            name: 'Заявки'
        },
        {
            path: 'room',
            name: 'Моя комната'
        }
    ]
}

const getCommandantRoutesForNavbar = () => {
    return [
        {
            path: 'home',
            name: 'Дом'
        },
        {
            path: 'profile',
            name: 'Профиль'
        },
        {
            path: 'requests',
            name: 'Заявки'
        },
        {
            path: 'residents',
            name: 'Проживающие'
        },
        {
            path: 'employees',
            name: 'Работники'
        },
        {
            path: 'things',
            name: 'Вещи'
        },
        {
            path: 'rooms',
            name: 'Комнаты'
        }
    ]
}

const getStudentCouncilRoutesForNavbar = () => {
    return [
        {
            path: "requests",
            name: 'Заявки'
        },
        {
            path: "residents",
            name: 'Проживающие'
        },
        {
            path: "home",
            name: 'Дом'
        },
        {
            path: "profile",
            name: 'Профиль'
        },
        {
            path: "rooms",
            name: 'Комнаты'
        }
    ]
}

const getSecurityGuearRoutesForNavbar = () => {
    return [
        {
            path: "residents",
            name: "Проживающие"
        }
    ]
}

const getDutyOfficerRoutesForNavbar = () => {
    return [
        {
            path: "residents",
            name: 'Проживающие'
        },
        {
            path: "rooms",
            name: 'Комнаты'
        },
    ]
}

const getSupplyManagerRoutesForNavbar = () => {
    return [
        {
            path: "rooms",
            name: 'Комнаты'
        },
        {
            path: "things",
            name: 'Вещи'
        }
    ]
}

const getFixerRoutesForNavbar = () => {
    return [
        {
            path: "requests",
            name: 'Заявки'
        }
    ]
}

// App Routes
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
            return (getCommandantRoutes())
        case 'Fixer' : 
            return (getFixerRoutes())
        case 'StudantCouncil' : 
            return (getStudentCouncilRoutes())
        case 'SecurityGuard' : 
            return (getSecurityGuearRoutes())
        case 'DutyOfficer' :
            return (getDutyOfficerRoutes())
        case 'SupplyManager' :
            return (getSupplyManagerRoutes())
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
        },
        {
            path: 'room',
            element: <ResidentRoom />
        }
    ]
}

const getCommandantRoutes = () => {
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

const getStudentCouncilRoutes = () => {
    return [
        {
            path: "requests",
            element: <Requests />
        },
        {
            path: "residents",
            element: <Residents />
        },
        {
            path: "residents:{id}",
            element: <Resident />
        },
        {
            path: "home",
            element: <Home />
        },
        {
            path: "profile",
            element: <Profile />
        },
        {
            path: "rooms",
            element: <Blocks />
        }
    ]
}

const getSecurityGuearRoutes = () => {
    return [
        {
            path: "residents",
            element: <Residents />
        },
        {
            path: "residents:{id}",
            element: <Resident />
        }
    ]
}

const getDutyOfficerRoutes = () => {
    return [
        {
            path: "residents",
            element: <Residents />
        },
        {
            path: "residents:{id}",
            element: <Resident />
        },
        {
            path: "rooms",
            element: <Blocks />
        }
    ]
}

const getSupplyManagerRoutes = () => {
    return [
        {
            path: "rooms",
            element: <Blocks />
        },
        {
            path: "things",
            element: <Things />
        }
    ]
}

const getFixerRoutes = () => {
    return [
        {
            path: "requests",
            element: <Requests />
        }
    ]
}