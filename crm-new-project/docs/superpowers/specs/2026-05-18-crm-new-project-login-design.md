# crm-new-project Login Design

## Overview
Create a new Vue 3 + Vite project `crm-new-project` with a login page, using mock data. Reference the existing `crm-front` project's login functionality.

## Tech Stack
| Module | Choice |
|--------|--------|
| Framework | Vue 3 |
| Build | Vite |
| UI Library | Naive UI |
| State Management | Pinia |
| Router | Vue Router 4 (hash mode) |
| HTTP | Axios |
| Mock | vite-plugin-mock + mockjs |

## Project Structure
```
crm-new-project/
├── index.html
├── package.json
├── vite.config.js
├── mock/
│   └── user.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── api/
│   │   └── user.js
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── user.js
│   ├── views/
│   │   └── login/
│   │       └── index.vue
│   └── utils/
│       └── request.js
```

## Features
- **Login form** — username + password with Naive UI form validation
- **Remember password** — encrypted storage in localStorage
- **Mock auth** — hardcoded mock account `admin / admin123`, returns fake token
- **Route guard** — redirect to home if authenticated, redirect to login if not
- **State management** — Pinia for token/user state

## Data Flow
```
Login page → validate form → dispatch login action →
POST /api/user/login (intercepted by mock) → returns token →
save to Pinia + localStorage → router.push('/')
```

## Mock API
- `POST /api/user/login` — accepts `{ username, password }`, validates against `admin/admin123`, returns `{ code: 200, data: { token } }`
- `GET /api/user/info` — returns mock user info when token is present

## Route Guard
- Whitelist: `/login`
- Has token + on `/login` → redirect to `/`
- Has token + not on `/login` → allow
- No token + not on whitelist → redirect to `/login`
