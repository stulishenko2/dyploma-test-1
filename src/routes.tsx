import {Sidebar} from "./components/Sidebar/Sidebar";

const mainRoutes = {
    path: '/',
    element: Sidebar,
    children: [
        { path: '*', element: <div></div> },
        {
            path: '/',
            element: <Requests />,
            name: t('requests'),
            icon: <OrdersIcon />,
        },
        {
            path: '/offers',
            element: <Outlet />,
            icon: <OffersIcon />,
            name: t('offers'),
            children: [
                {
                    path: '/offers/create',
                    element: <AddOffer />,
                    name: t('addOffer'),
                },
                {
                    path: '/offers/edit/:id',
                    element: <AddOffer />,
                },
                {
                    path: '/offers/view/:id',
                    element: <ViewOfferPage />,
                },
                {
                    index: true,
                    element: <Offers />,
                },
            ],
        },
        {
            path: '/settings',
            element: <Outlet />,
            name: t('settings'),
            icon: <SettingsIcon />,
            children: [
                {
                    path: '/settings/profile',
                    element: <ProfileSettings />,
                    name: t('profile'),
                },
                {
                    path: '/settings/business',
                    element: <BusinessSettings />,
                    name: t('business'),
                },
                {
                    index: true,
                    element: <MainSettings />,
                },
            ],
        },
        { path: '404', element: <PageNotFoundView /> },
    ]
};