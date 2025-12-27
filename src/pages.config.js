import Home from './pages/Home';
import Universities from './pages/Universities';
import Mentors from './pages/Mentors';
import BecomeMentor from './pages/BecomeMentor';
import Community from './pages/Community';
import Rankings from './pages/Rankings';
import ApplicationGuide from './pages/ApplicationGuide';
import Profile from './pages/Profile';
import UniversityMatcher from './pages/UniversityMatcher';
import SavedUniversities from './pages/SavedUniversities';
import FindMatch from './pages/FindMatch';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Universities": Universities,
    "Mentors": Mentors,
    "BecomeMentor": BecomeMentor,
    "Community": Community,
    "Rankings": Rankings,
    "ApplicationGuide": ApplicationGuide,
    "Profile": Profile,
    "UniversityMatcher": UniversityMatcher,
    "SavedUniversities": SavedUniversities,
    "FindMatch": FindMatch,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};