const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv'),config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.post('/user', async (req, res) => { // отправка данных покупки на backend
    const response = await fetch(`${process.env.LINK}/subscription-purchased`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
})


async function getLogin(token) {
    const userInfoResponse = await fetch('https://id.twitch.tv/oauth2/userinfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const userData = await userInfoResponse.json();
    return userData.preferred_username
}


async function userInfo(token) {
    const login = await getLogin(token)

    const getUserId = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
        method: 'GET',
        headers: {
            'Client-ID': `cgepdrk495l67vbh3cdw8682ez5032`,
            'Authorization': `Bearer ${token}`
        }
    })

    const userId = await getUserId.json()
    return [userId.data[0].id, userId.data[0].display_name, userId.data[0].profile_image_url] // id, name, img
}

async function getSub(id) {
    const subFetch = await fetch(`${process.env.LINK}/streamer-info/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const subInfo = await subFetch.json()
    return subInfo
}



function isSubscriptionActive(subscription) {
    // Получаем дату покупки подписки
    const subedAt = new Date(subscription.subed_at);
    
    // Получаем количество дней в подписке
    const subDayDuration = subscription.sub_dayDuration;
    
    // Вычисляем дату окончания подписки
    const endDate = new Date(subedAt);
    endDate.setDate(subedAt.getDate() + subDayDuration);
    
    // Получаем текущую дату
    const currentDate = new Date();
    
    // Сравниваем дату окончания подписки с текущей датой
    return [endDate > currentDate, endDate];
}

function formatDate(dateString) {
    // Создаем объект Date из строки
    const date = new Date(dateString);
    
    // Получаем день, месяц и год
    const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    
    // Форматируем дату в нужный формат
    return `${day}.${month}.${year}`;
}


app.get('/streamer-info/:token', async (req, res) => {

    let [usrId, name, img] = await userInfo(req.params['token'])
    console.log(usrId, name, img)
    const sub = await getSub(usrId)

    console.log(isSubscriptionActive(sub))
    let data = { name, img }
    let [subStatus, endDate] = isSubscriptionActive(sub)
    if (sub.error && subStatus) {
        data.status = false
    } else {
        data.status = true
        data.subscriptionInfo = sub
        data.endDate = formatDate(endDate)
    }
    console.log(data)
    res.json(data)
})

app.listen(PORT, () => console.log('server is running'))