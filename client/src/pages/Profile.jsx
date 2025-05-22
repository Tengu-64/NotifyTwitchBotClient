import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { UserContext } from "../context/UserContext";

export default function Profile() {
    const { user } = useContext(UserContext); // Предполагается, что user - это объект с токеном
    const [userData, setUserData] = useState(null); // Состояние для хранения данных пользователя
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        if (!user) {
            window.location.href = '/'
            return
        }

        async function fetchUserData() {
            try {
                const response = await fetch(`http://localhost:5000/streamer-info/${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                

                const data = await response.json();
                console.log(data)
                setUserData(data); // Сохраняем данные в состоянии
            } catch (error) {
                console.error(error);
                alert('error')
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        }

        fetchUserData();
    }, [user]); // Зависимость от user

    if (loading) {
        return <div>Loading...</div>; // Показать индикатор загрузки
    }

    if (!userData) {
        return <div>No user data found</div>; // Обработка случая, когда данные не найдены
    }
    return (
        <>
            <Title>Профиль</Title>
            <div className="profile">
                <div className="profileImg">
                    <img src={userData.img} alt={`${userData.name}'s profile`} />
                </div>
                <div className="profileInfo">
                    <h2>{userData.name}</h2>
                    {userData.status ?
                        <>
                            <h3>статус подписки: активна</h3>
                            <h3>дата окончания подписки: {userData.endDate}, через {userData.subscriptionInfo.sub_dayDuration} дней</h3>
                        </>
                        :
                        <h3>статус подписки: неактивна</h3>
                    }

                </div>
            </div>
        </>
    );
}