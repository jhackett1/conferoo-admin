var config = {
  google_client_id: "826165205387-b4u0mtq8diena38nabgqrd667kefjnfr.apps.googleusercontent.com",
  // Needs a fully-qualified URL with www (for Heroku) and trailing slash
  api_host: "http://www.fsconference.co.uk/",
  api_path: 'api',
  // No trailing slash here
  publisher_host: 'http://admin.fsconference.co.uk',
  // publisher_host: 'http://localhost:3000',
  // Populate theme controls for events and posts
  themes: [
    "Understanding the UK",
    "Policy and public engagement",
    "Data and technology"
  ],
  programmes: [
    "Thursday",
    "Friday"
  ],
  venues: [
    'C11', 'C6/34', 'C8/9', 'C20', 'C3'
  ]
}

export default config;
