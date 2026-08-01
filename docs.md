# StayVia Project Documentation

## What We Are Building

StayVia is a travel accommodation platform. The goal is to make the backend scalable and production-ready while keeping the frontend focused on a clean browsing and authentication experience.

The current technical direction is:

1. Secure authentication and authorization.
2. Listing browsing, listing details, and listing management.
3. Review support for listings.
4. A scalable backend that can later support booking, search, caching, pagination, and background jobs.

## Backend Overview

The backend is an Express + MongoDB API. It also uses cookie-based auth, CORS, file uploads through Multer, and a central error handler.

Base server behavior:

1. Connects to MongoDB on startup.
2. Accepts JSON and URL-encoded payloads.
3. Uses cookies for auth sessions.
4. Allows requests from the frontend running on `http://localhost:5173`.

## Backend API Endpoints

### Auth

Mounted at `/auth`.

1. `POST /auth/signup` - create a new user.
2. `POST /auth/login` - log in a user.
3. `POST /auth/logout` - log out the current user.
4. `GET /auth/me` - return the currently logged-in user.

### Listings

Mounted at `/listing`.

1. `GET /listing` - fetch all listings.
2. `GET /listing/:id` - fetch one listing by id.
3. `POST /listing` - create a new listing, protected by auth, with image upload support.
4. `PUT /listing/:id` - update a listing.
5. `DELETE /listing/:id` - delete a listing.
6. `GET /listing/my` - fetch the current user's listings.

### Reviews

Mounted at `/listing/:id/review`.

1. `POST /listing/:id/review` - add a review to a listing.
2. `DELETE /listing/:id/review/:reviewId` - delete a review.

## Frontend Currently Working

The frontend is a Vite + React app. The current implemented flow is:

1. Authentication pages for signup and login.
2. Auth state management through context.
3. Checking the current user on app load.
4. Fetching listings from the backend.
5. Displaying listings in the UI.
6. Create  seprate HostLayout page and layout 

### Current Frontend Limitation

Filtering is currently done on the frontend after the full listings data is fetched.

This is not ideal because:

1. It does not scale well as the number of listings grows.
2. It can make the UI slower for large datasets.
3. It should eventually move to backend-driven search, filter, and pagination.

## Next Technical Improvements

1. Move filtering and search to the backend.
2. Add pagination to listing APIs.
3. Add Redis caching for frequently read data.
4. Add background jobs for slow tasks like notifications.
5. Add stronger validation and rate limiting for public auth endpoints.
