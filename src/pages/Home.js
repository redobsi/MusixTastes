import MusicsPanel from "./components/MusicsPanel";

const Home = ({ current_user }) => {
  return (
    <div className='Main-Wrapper'>
      <h1 className='Mini-messages'>{"Try these new songs !"}</h1>
      <MusicsPanel current_user = {current_user}/>
    </div>
  )
}

export default Home