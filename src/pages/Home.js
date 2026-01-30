import './Home.css';
import TransitMap from '../components/TransitMap';

function Home() {
    return (
        <div className="home-container">
            <div className="header-container">
                <img src="/images/fLogo.svg" alt="fLogo" className="logo-img" />
                <div className="title-container">
                    <h1>Franklin Nguyen</h1>
                    <h2 className='subtitle-text'>
                        Software Engineer & MIT Alumnus
                    </h2>
                </div>
            </div>
            <div className="content-container">
                <TransitMap />
            </div>
        </div>
    );
}
export default Home;