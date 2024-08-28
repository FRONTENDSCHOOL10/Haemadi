import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout/RootLayout';

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
];

// 라우터
const router = createBrowserRouter(routes);

// 라우터 내보내기
export default router;
