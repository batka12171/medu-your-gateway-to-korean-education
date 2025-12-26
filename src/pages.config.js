import Home from './pages/Home';
import Universities from './pages/Universities';
import Mentors from './pages/Mentors';
import BecomeMentor from './pages/BecomeMentor';
import Community from './pages/Community';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Universities": Universities,
    "Mentors": Mentors,
    "BecomeMentor": BecomeMentor,
    "Community": Community,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};