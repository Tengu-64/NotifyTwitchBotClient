import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
const TWITCH_AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=channel:read:editors&force_verify=true&`;

export default function Header() {
    const { user, setUser } = useContext(UserContext)

    function logout() {
        setUser(null)
        window.location.href = REDIRECT_URI
    }

    function addToken() {
        let hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');
            // console.log(accessToken);
            setUser(accessToken)
        }
    }

    addToken()

    return (
        <nav className="menu">
            <Link to="/" >Главная</Link>
            <Link to="/subs" >Подписки</Link>
            {user ? (
                <>
                    <Link to="/profile">Профиль</Link>
                    <p className="logout" onClick={logout}>Выйти</p>
                </>
            ) : (<a href={TWITCH_AUTH_URL}>Авторизация</a>)
            }

        </nav>
    )
}