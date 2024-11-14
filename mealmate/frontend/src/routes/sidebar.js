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
    name: 'Meal Requests', // name that appear in Sidebar
  },
  {
    path: '/app/appeals',
    // icon: 'TablesIcon',
    icon: 'ChefIcon',
    name: 'Chef\'s Appeal',
  },
  {
    path: '/app/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/app/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/app/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/app/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
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
      {
        path: '/app/update-profile',
        name: 'Update Profile',
      },
      
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/app/404',
        name: '404',
      },
      {
        path: '/app/blank',
        name: 'Blank',
      },

      
    ],
  },
]

export default routes
