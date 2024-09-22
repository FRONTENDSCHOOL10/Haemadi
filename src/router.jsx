import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from './components/Loading/Loading';

const RootLayout = lazy(() => import('./layouts/RootLayout/RootLayout'));
const AuthPage = lazy(() => import('./pages/authPage'));
const CalenderPage = lazy(() => import('./pages/calendarPage'));
const DemoPage = lazy(() => import('./pages/demoPage'));
const HomePage = lazy(() => import('./pages/homePage'));
const LetterBoxPage = lazy(() => import('./pages/letterBoxPage'));
const MusicPage = lazy(() => import('./pages/musicPage'));
const MyPage = lazy(() => import('./pages/myPage'));
const PickUpBottlePage = lazy(() => import('./pages/pickUpBottlePage'));
const SelectReplyPage = lazy(() => import('./pages/selectReplyPage'));
const SendLetterPage = lazy(() => import('./pages/sendLetterPage'));
const SettingsPage = lazy(() => import('./pages/settingsPage'));
const SignInPage = lazy(() => import('./pages/signInPage'));
const SignUpPage = lazy(() => import('./pages/signUpPage'));
const StatisticsPage = lazy(() => import('./pages/statisticsPage'));
const UserInfoInputPage = lazy(() => import('./pages/userInfoInputPage'));
const ViewDiaryPage = lazy(() => import('./pages/viewDiaryPage'));
const ViewLetterPage = lazy(() => import('./pages/viewLetterpage'));
const WriteDiaryPage = lazy(() => import('./pages/writeDiaryPage'));
const WriteReplyPage = lazy(() => import('./pages/writeReplyPage'));

const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'music',
        element: <MusicPage />,
      },
      {
        path: 'my',
        element: <MyPage />,
      },
      {
        path: 'my/settings',
        element: <SettingsPage />,
      },
      {
        path: 'my/calendar',
        element: <CalenderPage />,
      },
      {
        path: 'my/view-diary/:diaryId',
        element: <ViewDiaryPage />,
      },
      {
        path: 'my/statistics',
        element: <StatisticsPage />,
      },
      {
        path: 'write-diary/:emotion',
        element: <WriteDiaryPage />,
      },
      {
        path: 'write-diary/select-reply/:step',
        element: <SelectReplyPage />,
      },
      {
        path: 'write-diary/send-letter',
        element: <SendLetterPage />,
      },
      {
        path: 'pick-up-bottle',
        element: <PickUpBottlePage />,
      },
      {
        path: 'pick-up-bottle/write-reply/:diaryId',
        element: <WriteReplyPage />,
      },
      {
        path: 'pick-up-bottle/view-letter/:diaryId',
        element: <ViewLetterPage />,
      },
      {
        path: 'letter-box',
        element: <LetterBoxPage />,
      },
      {
        path: 'letter-box/view-diary/:diaryId',
        element: <ViewDiaryPage />,
      },
    ],
  },
  {
    path: '/demo/:step',
    element: <DemoPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />,
  },
  {
    path: 'my/settings/user-info-input/:progress',
    element: <UserInfoInputPage />,
  },
];

// 라우터
const router = createBrowserRouter(routes);

const AppRouter = () => (
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router} />
  </Suspense>
);

// 라우터 내보내기
export default AppRouter;
