# AWS S3 API

This project is a basic API that interacts with AWS S3 for file operations such as uploading, retrieving, and deleting files.

## Project Structure

```
aws-s3-api
├── src
│   ├── index.js               # Entry point of the application
│   ├── controllers
│   │   └── s3Controller.js    # Handles S3 operations
│   ├── routes
│   │   └── s3Routes.js        # Defines API routes
│   └── services
│       └── s3Service.js       # Interacts with AWS S3 SDK
├── package.json                # NPM configuration file
├── .env                        # Environment variables for AWS configuration
└── README.md                   # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd aws-s3-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your AWS credentials:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   ```

4. Start the application:
   ```
   npm start
   ```

## API Usage

### Upload File

- **Endpoint**: `POST /upload`
- **Description**: Uploads a file to S3.
- **Request Body**: Form-data with file.

### Get File

- **Endpoint**: `GET /file/:key`
- **Description**: Retrieves a file from S3 using its key.

### Delete File

- **Endpoint**: `DELETE /file/:key`
- **Description**: Deletes a file from S3 using its key.

## License

This project is licensed under the MIT License.