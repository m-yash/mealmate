```
mealmate
├─ .idea
│  ├─ mealmate.iml
│  ├─ modules.xml
│  ├─ vcs.xml
│  └─ workspace.xml
├─ backend
│  ├─ .env
│  ├─ db.js
│  ├─ insertDataTest.js
│  ├─ middleware
│  │  └─ authenticate.js
│  ├─ models
│  │  ├─ Booking.js
│  │  ├─ Chef.js
│  │  ├─ Notifications.js
│  │  ├─ Request.js
│  │  ├─ Review.js
│  │  ├─ User.js
│  │  └─ UserResponses.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ bookingRoute.js
│  │  ├─ chefRoute.js
│  │  ├─ profileUpdateRoute.js
│  │  ├─ requestRoute.js
│  │  ├─ responseRoute.js
│  │  ├─ statisticRoute.js
│  │  └─ userRoute.js
│  ├─ server.js
│  └─ uploads
│     ├─ 1730600162190-VehiclePositions.pb
│     ├─ 1730601664185-VehiclePositions.pb
│     ├─ 1730602208807-VehiclePositions.pb
│     ├─ 1730602247749-VehiclePositions.pb
│     ├─ 1730919049931-TripUpdates.pb
│     ├─ 1730919251505-VehiclePositions.pb
│     ├─ 1731105612598-TripUpdates.pb
│     ├─ 1731107671593-TripUpdates.pb
│     ├─ 1731212853928-meal-plan-svgrepo-com.svg
│     ├─ 1731308908285-meal-plan-svgrepo-com (2).svg
│     └─ 1731310266874-meal-plan-svgrepo-com (1).svg
├─ frontend
│  ├─ .babelrc
│  ├─ babel.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ App.test.js
│  │  ├─ AppCSS.css
│  │  ├─ assets
│  │  │  ├─ css
│  │  │  │  ├─ tailwind.css
│  │  │  │  └─ tailwind.output.css
│  │  │  └─ img
│  │  │     ├─ chef1.jpeg
│  │  │     ├─ chef2.jpg
│  │  │     ├─ create-account-office-dark.jpeg
│  │  │     ├─ create-account-office.jpeg
│  │  │     ├─ deafult-profile-icon.jpg
│  │  │     ├─ forgot-password-office-dark.jpeg
│  │  │     ├─ forgot-password-office.jpeg
│  │  │     ├─ login-office-dark.jpeg
│  │  │     └─ login-office.jpeg
│  │  ├─ components
│  │  │  ├─ chefSignup.js
│  │  │  ├─ home.js
│  │  │  ├─ login.js
│  │  │  └─ userSignup.js
│  │  ├─ containers
│  │  │  ├─ Layout.js
│  │  │  └─ Main.js
│  │  ├─ context
│  │  │  ├─ AuthContext.js
│  │  │  ├─ SidebarContext.js
│  │  │  └─ ThemeContext.js
│  │  ├─ icons
│  │  │  ├─ accept.svg
│  │  │  ├─ bell.svg
│  │  │  ├─ buttons.svg
│  │  │  ├─ cards.svg
│  │  │  ├─ cart.svg
│  │  │  ├─ charts.svg
│  │  │  ├─ chat.svg
│  │  │  ├─ chef.svg
│  │  │  ├─ dropdown.svg
│  │  │  ├─ edit.svg
│  │  │  ├─ forbidden.svg
│  │  │  ├─ forms.svg
│  │  │  ├─ github.svg
│  │  │  ├─ heart.svg
│  │  │  ├─ home.svg
│  │  │  ├─ index.js
│  │  │  ├─ mail.svg
│  │  │  ├─ menu.svg
│  │  │  ├─ modals.svg
│  │  │  ├─ money.svg
│  │  │  ├─ moon.svg
│  │  │  ├─ outlineCog.svg
│  │  │  ├─ outlineLogout.svg
│  │  │  ├─ outlinePerson.svg
│  │  │  ├─ pages.svg
│  │  │  ├─ people.svg
│  │  │  ├─ request.svg
│  │  │  ├─ search.svg
│  │  │  ├─ sun.svg
│  │  │  ├─ tables.svg
│  │  │  ├─ trash.svg
│  │  │  └─ twitter.svg
│  │  ├─ index.js
│  │  ├─ indexCSS.css
│  │  ├─ logo.svg
│  │  ├─ pages
│  │  │  ├─ 404.js
│  │  │  ├─ AvailableAppeals.js
│  │  │  ├─ Blank.js
│  │  │  ├─ Booking.js
│  │  │  ├─ Buttons.js
│  │  │  ├─ Cards.js
│  │  │  ├─ Charts.js
│  │  │  ├─ CreateAccount.js
│  │  │  ├─ Dashboard copy.js
│  │  │  ├─ Dashboard.js
│  │  │  ├─ ForgotPassword.js
│  │  │  ├─ Forms.js
│  │  │  ├─ Login.js
│  │  │  ├─ Modals.js
│  │  │  ├─ MyAppeals.js
│  │  │  ├─ MyRequests.js
│  │  │  ├─ Statistic.js
│  │  │  └─ UpdateProfile.js
│  │  ├─ reportWebVitals.js
│  │  ├─ routes
│  │  │  ├─ index.js
│  │  │  ├─ Protected.js
│  │  │  └─ sidebar.js
│  │  ├─ serviceWorker.js
│  │  ├─ setupTests.js
│  │  ├─ uicomponents
│  │  │  ├─ AccessibleNavigationAnnouncer.js
│  │  │  ├─ Cards
│  │  │  │  └─ InfoCard.js
│  │  │  ├─ Chart
│  │  │  │  ├─ ChartCard.js
│  │  │  │  └─ ChartLegend.js
│  │  │  ├─ CTA.js
│  │  │  ├─ Header.js
│  │  │  ├─ RoundIcon.js
│  │  │  ├─ Sidebar
│  │  │  │  ├─ DesktopSidebar.js
│  │  │  │  ├─ index.js
│  │  │  │  ├─ MobileSidebar.js
│  │  │  │  ├─ SidebarContent.js
│  │  │  │  └─ SidebarSubmenu.js
│  │  │  ├─ ThemedSuspense.js
│  │  │  └─ Typography
│  │  │     ├─ PageTitle.js
│  │  │     └─ SectionTitle.js
│  │  └─ utils
│  │     └─ demo
│  │        ├─ chartsData.js
│  │        └─ tableData.js
│  └─ tailwind.config.js
├─ notes
├─ package-lock.json
├─ package.json
└─ README.md

```
