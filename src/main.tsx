import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'


//* Pages
import { App } from './pages/app'
import { Sentiment } from './pages/sentiment';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sentiment/:sentiment",
    element: <Sentiment />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
