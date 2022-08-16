import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

/* 더미 데이터
const dummyMovies = [
	{
		id: 1,
		title: 'Some Dummy Movie',
		openingText: 'This is the opening text of the movie',
		releaseDate: '2021-05-18',
	},
	{
		id: 2,
		title: 'Some Dummy Movie 2',
		openingText: 'This is the second opening text of the movie',
		releaseDate: '2021-05-19',
	},
];*/
function App() {
	const [movies, setMovies] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	/*이 함수가 호출될때마다 매번 http 요청이 전송됨*/
	async function fetchMoviesHandler() {
		/*fetchMoviesHandler 함수가 호출되면 loading state 가 true 변환*/
		setIsLoading(true)

		/*fetch func 는 browser 가 사용할수있게해준 func
		* -첫번째 인자는 요청을 전송하려는 URL, 두 번째인자는 다양한 선택사항 지정 가능(object,request method change 기타등등)
		* -fetch func 는 promise 객체를 반환하며 발생할수있는 오류 및 호출에 대한 응답에 반응할수있게해줌
		* -http request 전송은 async 작업 이며 밀리초 및 몇초가 걸리는 작업이고 실패할 가능성도있음
		* --따라서 코드 다음줄로 작업을 계속하고 코드의 결과를 바로 사용할수없지만 코드 실행의 결과는 미래의 어느 시점에서 확인가능(js 에 Promise 객체가있는 이유)
		* -then 을 추가해주면 최종함수는 응답을 받을때 호출됨
		* -그 뒤에 .catch() 문을 추가하면 잠재적 오류 처리 가능*/
		const response = await fetch('https://swapi.dev/api/films');
		const data = await response.json();
		/*.then(response => {
			/!*응답을 받은뒤 여기서 응답을 사용할수있다
			* -then 에 들어온 response 는 객체이며 요청 응답에 대한 데이터를 가지고있음(응답 헤더를 읽거나 상태 코드를 얻을 수도있다)
			* -response.ok 는 모든것이 정상이면 true , 아니면 false 반환
			* -response.json() 은 response 의 본문을 code 에서 사용 할수있는 js object 로 자동 변환해줌*!/
			return response.json()
			/!*}).then(data => {
				data.results /!*API 에있는 result 배열에 접근*!/!*!/
		})
		.then((data) => {*/
		/*넘겨받은 배열의 모든 객체를 새로운 객체로 변환함, 새로운 객체는 새로운 객체로 채워진 배열임*/
		const transformedMovies = data.results.map(movieData => {
			return {
				id: movieData.episode_id,
				title: movieData.title,
				openingText: movieData.opening_crawl,
				releaseDate: movieData.releaseDate,
			}
		})
		setMovies(transformedMovies) /*API 의 results 의 배열이 movies 에대한 새로운 state 가 됨*/
		/*setMovies(data.results) /!*API 의 results 의 배열이 movies 에대한 새로운 state 가 됨*!/*/

		/*data 가 출력되면 loading state 는 다시 false*/
		setIsLoading(false)
	}


	return (
			<React.Fragment>
				<section>
					<button onClick={fetchMoviesHandler}>Fetch Movies</button>
				</section>
				<section>
					{!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
					{!isLoading && movies.length === 0 && <p>영화 검색 결과가 없습니다.</p>}
					{isLoading && <p>현재 로딩 중입니다... 잠시만 기다려주세요</p>}
				</section>
			</React.Fragment>
	);
}

export default App;
