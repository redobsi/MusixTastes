import CardPack from "./components/CardPack"

const Discover = ({ current_user }) => {
    return (
        <div className='Card-Manager'>
            <h1 className='Up-message'>Find your new favorite music !</h1>
            <CardPack current_user={current_user}/>
        </div>
  )
}

export default Discover