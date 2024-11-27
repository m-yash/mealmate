/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    // icon: 'HomeIcon',
    icon: 'RequestIcon', // the component being exported from icons/index.js
    name: 'Available Requests', // name that appear in Sidebar
  },
  {
    path: '/app/my-requests',
    // icon: 'TablesIcon',
    icon: 'RequestIcon',
    name: 'My Requests',
  },
  {
    path: '/app/appeals',
    // icon: 'TablesIcon',
    icon: 'ChefIcon',
    name: 'Available Appeals',
  },
  {
    path: '/app/my-appeals',
    // icon: 'TablesIcon',
    icon: 'ChefIcon',
    name: 'My Appeals',
  },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  
  {
    path: '/app/my-mates',
    icon: 'ModalsIcon',
    name: 'My Mates',
  },
  {
    path: '/app/statistic',
    icon: 'ModalsIcon',
    name: 'Statistic',
  },

  {
    icon: 'PagesIcon',
    name: 'Settings',
    routes: [
      // submenu
      // {
      //   path: '/app/update-profile',
      //   name: 'Update Profile',
      // },
      
      // {
      //   path: '/login',
      //   name: 'Login',
      // },
      // {
      //   path: '/create-account',
      //   name: 'Create account',
      // },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      // {
      //   path: '/app/404',
      //   name: '404',
      // },
      {
        path: '/app/blank',
        name: 'Help',
      },

      
    ],
  },
]

export default routes
