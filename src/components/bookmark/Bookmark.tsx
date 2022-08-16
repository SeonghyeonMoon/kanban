import styled from 'styled-components';

const Bookmark = () => {
	return (
		<ul>
			<li>
				<a href='https://www.google.com/'>
					<LogoIcon src='https://cdn-icons-png.flaticon.com/512/2991/2991148.png' alt='google logo' />
				</a>
			</li>
			<li>
				<a href='https://www.naver.com/'>
					<LogoIcon
						src='https://7dreamersmedia.blob.core.windows.net/wpmedia/2018/09/naver-full.png'
						alt='naver logo'
					/>
				</a>
			</li>
		</ul>
	);
};

export default Bookmark;

const LogoIcon = styled.img`
	width: 50px;
	height: 50px;
`;
