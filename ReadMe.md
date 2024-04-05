# Maker-Checker Functionality

This project implements the maker-checker functionality, allowing users to create requests which are then approved or denied by designated approvers.

## Stack

This project is built using the following technologies:

- Express.js: A minimalist web framework for Node.js.
- TypeScript: A statically typed superset of JavaScript.
- Prisma: A modern database toolkit for TypeScript and Node.js.

```markdown
# Setup Instructions

## Environment Configuration

1. Create a `.env` file in the root directory of your project.

2. Add the following environment variables to the `.env` file:
   ```

   DATABASE_URL="postgres://makerchecker:XcembodjTv3ZX2UpwUBuiuPYnGSFEW2x@dpg-co83uc6v3ddc73b7tvjg-a.oregon-postgres.render.com/makerchecker_b67g"
   PORT=3000

   ```

## Running the Application

To run the application, follow these steps:

1. Install dependencies by running:
   ```

   npm install

   ```

2. Start the server by running:
   ```

   npm start

   ```

This will start the application on port 3000 by default.
```

## Schema

The schema defines the database structure and relationships between entities:

- **User**: Represents users with attributes such as username, email, and role. Each user can be associated with multiple requests and can also act as an approver.
- **Approver**: Connects users with approved request types. Each approver can approve requests based on their approved request types.
- **Request**: Represents individual requests made by users. Each request has a requester, a request type, and a status indicating whether it's pending, approved, denied, or expired.

## Routes

### Create Requester

- **POST** `/api/createRequester`
  - Creates a new requester.
  - Request Body:

    ```json
    {
        "username": "aaaattt",
        "email": "ukaa22sss11@gmail.com",
        "role": "REQUESTER"
    }
    ```

  - Response:

    ```json
    {
        "id": "7d508fa4-c119-4a34-971d-c13edf9dbbe4",
        "username": "aaaattt",
        "email": "ukaa22sssq11@gmail.com",
        "role": "REQUESTER",
        "createdAt": "2024-04-05T22:34:23.745Z",
        "updatedAt": "2024-04-05T22:34:23.745Z"
    }
    ```

### Create Approval User

- **POST** `/api/createApprovalUser`
  - Creates a new user with approver role and approved request types.
  - Request Body:

    ```json
    {
        "username": "TobePertera",
        "email": "tozeeda221q@gmail.com",
        "requestTypes": ["C", "A"]
    }
    ```

  - Response:

    ```json
    {
        "id": "609f2f41-b671-47ad-8381-f0cd8f8e69c4",
        "username": "TobePertera",
        "email": "tozeeda221eq@gmail.com",
        "role": "APPROVER",
        "createdAt": "2024-04-05T22:35:37.259Z",
        "updatedAt": "2024-04-05T22:35:37.259Z",
        "Approver": [
            {
                "id": "64ed646b-8a2d-47f7-afc4-5ec2fc0c2771",
                "userId": "609f2f41-b671-47ad-8381-f0cd8f8e69c4",
                "approvedRequestTypes": ["B", "C"]
            }
        ]
    }
    ```

### Create Request

- **POST** `/api/createrequests`
  - Creates a new request.
  - Request Body:

    ```json
    {
        "requesterId": "5e1c916a-9a6f-4cbd-ad55-624fe4e73b72",
        "requestType": "C",
        "expiration": "2024-04-09T12:00:00Z"
    }
    ```

  - Response:

    ```json
    {
    "id": "b3daee36-81d3-460e-9395-8dfd3fac7d26",
    "requesterId": "7d508fa4-c119-4a34-971d-c13edf9dbbe4",
    "requestType": "C",
    "description": null,
    "details": null,
    "status": "PENDING",
    "expiration": "2024-04-09T12:00:00.000Z",
    "createdAt": "2024-04-05T22:47:14.133Z",
    "updatedAt": "2024-04-05T22:47:14.133Z"

}
    ```

### Approve Request

- **PUT** `/api/{requestId}/approve`
  - Approves or denies a request.
  - Request Body:

    ```json
    {
        "approverId": "518e0c09-7df5-4613-896b-14f20118b7ce",
        "status": "Declined"
    }
    ```

### Get User Details

- **GET** `/api/{userId}`
  - Retrieves details of a user by ID.
  - Response:

    ```json
    {
        "id": "609f2f41-b671-47ad-8381-f0cd8f8e69c4",
        "username": "TobePertera",
        "email": "tozeeda221eq@gmail.com",
        "role": "APPROVER",
        "createdAt": "2024-04-05T22:35:37.259Z",
        "updatedAt": "2024-04-05T22:35:37.259Z",
        "Approver": [
            {
                "id": "64ed646b-8a2d-47f7-afc4-5ec2fc0c2771",
                "userId": "609f2f41-b671-47ad-8381-f0cd8f8e69c4",
                "approvedRequestTypes": ["B", "C"]
            }
        ],
        "Request": []
    }
    ```
