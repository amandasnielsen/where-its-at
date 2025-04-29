import './landingpage.css';
import NavButtons from '../../components/NavButtons/NavButtons';

function LandingPage() {
  return (
	<section className="landingpage">
		<img src="./src/assets/images/logo.png" alt="logo with confetti" />
		<h1 className="title__landing">Where It's @</h1>
		<h2 className="subtitle__landing">Ticketing made easy</h2>
		<NavButtons />
	</section>
  )
}

export default LandingPage;