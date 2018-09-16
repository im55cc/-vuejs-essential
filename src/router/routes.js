export default [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: '/',
        alias: '/topics',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    // EditUsers
    {
        path: '/users/1/edit',
        name: 'EditUsers',
        component: () => import('@/views/users/Edit.vue'),
        children: [
            {
                path: '',
                name: 'EditProfile',
                component: () => import('@/views/users/Profile.vue'),
                meta: {auth: true}
            },
            // EditAvatar
            {
                path: '/users/1/edit_avatar',
                name: 'EditAvatar',
                component: () => import('@/views/users/Avatar.vue'),
                meta: {auth: true}
            },
            // EditPassword
            {
                path: '/users/1/edit_password',
                name: 'EditPassword',
                component: () => import('@/views/users/Password.vue'),
                meta: {auth: true}
            },
        ]
    },
    // Create
    {
        path: '/articles/create',
        name: 'Create',
        component: () => import('@/views/articles/Create'),
        meta: { auth: true }
    },
    // Edit
    {
        path: '/articles/:articleId/edit',
        name: 'Edit',
        component: () => import('@/views/articles/Create'),
        meta: { auth: true }
    },
    // Search
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Search')
    },
    // Column
    {
        path: '/:user',
        component: () => import('@/views/articles/Column'),
        children: [
            {
                path: '',
                name: 'Column',
                component: () => import('@/views/articles/List.vue')
            },
            {
                path: '/articles/:articleId/content',
                name: 'Content',
                component: () => import('@/views/articles/Content.vue')
            }
        ]
    }
]