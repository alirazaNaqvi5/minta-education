const baseUrl = process.env.NODE_ENV === "production" 
? 'https://minta-react.example.com' 
: 'http://localhost:3000';

export default baseUrl;