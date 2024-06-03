
import OpenModalButton from "../../OpenModalButton"
import LoginFormModal from "../../LoginFormModal"
import SignUpFormModal from "../../SignupFormModal"


function HomeNotSignedIn() {

    return <main>
    <h1>Start collecting places you want to remember and sharing with friends</h1>
    <OpenModalButton modalComponent={<LoginFormModal/>} buttonText="Log in"/>
    <OpenModalButton modalComponent={<SignUpFormModal/>} buttonText="Sign up"/>
    </main>

}

export default HomeNotSignedIn
