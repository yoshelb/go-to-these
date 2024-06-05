import HomeNotSignedIn from "./HomeNotSignedIn"
import { useSelector } from 'react-redux'
import HomePageSignedIn from "./HomePageSignedIn";

function HomePage(){
    const sessionUser = useSelector((state) => state.session.user);

    return sessionUser ? <HomePageSignedIn sessionUser={sessionUser}/> : <HomeNotSignedIn/>
}

export default HomePage
