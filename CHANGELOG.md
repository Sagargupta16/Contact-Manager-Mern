# Changelog

## Unreleased

### Fixed

- Contact schema now includes `phone` field (was accepted by API but never persisted)
- ContactDetail crash when contact not found (missing null check on `.find()`)
- CORS config typo (`Credentials` -> `credentials`)
- `__dirname` reassignment in index.js
- App crash when API returns non-array response (e.g. serving without backend)
- Removed deprecated `useNewUrlParser` mongoose option
- Removed `body-parser` usage in routes (redundant with Express 5 built-in parsing)
- ContactDetail uses `useParams` instead of `useLocation` pathname hack
- Duplicate Font Awesome CSS link in index.html, downgraded to v6.5.1
- `.editorconfig` indent_size corrected from 3 to 2

### Changed

- Split deployment: frontend on GitHub Pages, backend API-only on Render
- Frontend API calls use `REACT_APP_API_URL` env var (empty in dev, Render URL in prod)
- GitHub Actions workflow auto-deploys frontend on push to `client/`
- CORS restricted to GitHub Pages origin and localhost
- Backend no longer serves static files
- Complete UI redesign: Inter font, semantic CSS variables, proper card spacing, subtle hover effects, focus rings on inputs, cleaned up dark/light mode palette
- `.nvmrc` updated from Node 19 (EOL) to Node 22 (LTS)

### Removed

- Unused dependencies: `bcryptjs`, `body-parser`, `validation` (backend); `uuid`, `uuidv4`, `util`, `util-deprecate`, `@testing-library/*`, `web-vitals` (client)
- Dead `isLoading` state and verbose console logging in App.js
- Unnecessary files: `.deepsource.toml`, `.python-version`, `.maintenance`, `TOAST_SETUP.md`, `client/README.md`, `pnpm-lock.yaml`
- Unreferenced screenshots (`client/images/1_4..1_8.png`)

### Security

- Resolved all 59 client npm audit vulnerabilities (down to 0) via `npm audit fix` and npm overrides for react-scripts transitive deps

## v0.4.0 - 2025-08-03

### Added

- React-Toastify notifications for all CRUD operations
- Delete confirmation dialog
- Dark/light mode toggle with localStorage persistence
- Custom toast styling (`Toast.css`)

### Changed

- Converted class components to functional components with hooks
- Replaced `findByIdAndRemove` with `findByIdAndDelete`
- Added ObjectId validation on delete route

## v0.3.0 - 2023-12-17

### Fixed

- Removed accidentally committed `client/build` directory
- Updated `.gitignore` to exclude build artifacts
- Fixed ContactCard and ContactDetail components

## v0.2.0 - 2023-11-08

### Changed

- Applied Prettier formatting across codebase
- Fixed database connection configuration
- Frontend fixes and cleanup

## v0.1.0 - 2022-07-24

### Added

- Initial MERN stack contact manager
- Express backend with MongoDB (Mongoose) on port 3006
- React frontend with React Router for SPA navigation
- Full CRUD API (`/api/contacts`)
- Contact list with search filtering
- Add, edit, and detail views
- Gravatar placeholder avatars
- MIT license
