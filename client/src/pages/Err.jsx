import Title from "../components/Title"
export default function Err() {
    return (
        <>
            <Title>Ошибка</Title>
            <div className="errImg">
                <img src='/error.png' alt="" />
            </div>
        </>
    )
}