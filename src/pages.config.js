import ApplicationGuide from './pages/ApplicationGuide';
import BecomeMentor from './pages/BecomeMentor';
import Community from './pages/Community';
import FindMatch from './pages/FindMatch';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Rankings from './pages/Rankings';
import SavedUniversities from './pages/SavedUniversities';
import Universities from './pages/Universities';
import UniversityMatcher from './pages/UniversityMatcher';
import __Layout from './Layout.jsx';


export const PAGES = {
    "ApplicationGuide": ApplicationGuide,
    "BecomeMentor": BecomeMentor,
    "Community": Community,
    "FindMatch": FindMatch,
    "Home": Home,
    "Mentors": Mentors,
    "Messages": Messages,
    "Profile": Profile,
    "Rankings": Rankings,
    "SavedUniversities": SavedUniversities,
    "Universities": Universities,
    "UniversityMatcher": UniversityMatcher,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};