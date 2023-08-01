import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
	:root {
		--base-color-white: #f5f5f5;
		--base-color-lightgrey: #f2f2f2;
		--base-color-grey: #d9d9d9;
		--base-color-black: #333333;
		--point-color-blue: #47b8e0;
		--point-color-yellow: #ffc952;
		--point-color-green: #34be3a;
		--point-color-red: #ff7473;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position : relative;
		top: calc(50% - 422px);
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 390px;
		height: 844px;
		/* background-color: var(--base-color-black); */
		/* box-shadow: 0 4px 10px -4px var(--point-color-green); */
	}

	* {
		font-family: 'SUITE Variable', 'sans-serif';
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
		color: var(--base-color-black);
	}
	
	h1 {
		font-weight: 700;
	}

	h3 {
		font-weight: 400;
	}
	
	div {
		font-weight: 400;
	}
	ul {
		padding: 0;
	}
	input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
}
`;

export default GlobalStyles;
