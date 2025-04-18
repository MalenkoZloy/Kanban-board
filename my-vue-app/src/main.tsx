import {BrowserRouter} from "react-router-dom";
import Layout from "./shared/Components/Layout/Layout";
import App from "./App";
import {createRoot} from "react-dom/client";
import './globals.css';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<BrowserRouter>
			<Layout>
				<App />
			</Layout>
		</BrowserRouter>
	);
}
