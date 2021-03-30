# Search-Sort-Paginate-API
Implementing Search sort and paginate against a list of users using mysql as the database


REST API to get user Information.
Uses JWT to secure user endpoint.
JWT verification added in middleware folder.
Two route files. auth.js contains authentication endpoints. user.js contains user endpoint.

# Testing
eg request: http://localhost:5000/api/user?firstName=moiz&lastName=shaikh&empId=abc123&sort=empId&limit=2&page=1

# For search: 
uses firstName, lastName, empId as query params.

# For Sort:
uses sort as query param. Accepts firstName, lastName, email, empId, organization as values.

# For Pagination
Pagination uses page and limit as query params.
