import './notfoundpage.css';

function NotFoundPage() {
  return (
	<div className="notfound__page">
		<div className="error__text">
			<h2>404</h2>
			<p>You lost?</p>
			<img
				src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3A3cXBsa3UwdzluY3dxeGVpcnV6Mmt0Nmx4eGEzZGVwamFtNGN0NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j6aoUHK5YiJEc/giphy.gif"
				alt="Confused John Travolta"
				style={{ width: '250px', height: 'auto' }}
			/>
		</div>
		<a href="/" className='button__notfound'>Back to home</a>
	</div>
  )
}

export default NotFoundPage;