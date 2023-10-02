# Connect a Social Network

## Description

<br>

**"Connect"** is a web application inspired by Twitter, with a focus on upcoming features like Threads (Meta). It empowers users to create an account, establish a personalized profile, and easily upload or update their profile pictures. The platform boasts full responsiveness, enabling seamless usage across various devices. Users can compose, edit, delete, like, and repost posts, fostering an engaging social experience.

<br>

### Project Details:

**Frontend Technology**: This project is primarily built using Next.js 13, which leverages app routing for efficient navigation. TypeScript enhances type safety and code quality, while TailwindCSS ensures a sleek and intuitive user interface.

**Database**: The application utilizes MongoDB as its backend database, providing a robust and flexible storage solution for the social network's data.

**Authorization**: User authentication and authorization are seamlessly handled through Clerk, ensuring secure access control and a smooth user experience.

**UI Components**: To streamline development, select UI components are sourced from shadcn/ui, offering pre-built building blocks for the application's user interface.

<br>

## Installation and Usage

To run this project on your own machine you will need to clone the repository, create a MongoDb database, setup your Clerk account, and uploadthing to manage the profile pictures.

1. Clone this repository: git clone `https://github.com/ErikaJPB/connect-app`

2. Navigate to the project directory: `cd connect-app`

3. Install the dependencies: `npm install`

4. Create a `.env.local ` file and add your keys as follows "

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=


NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

MONGODB_URL=


UPLOADTHING_SECRET=


```

5. Run the development server: `npm run dev`

6. Open http://localhost:3000 in your browser to see the website.

<br>

#### Features:

**User Profiles**: Users can create and customize their profiles, including the option to upload or change their profile pictures.

**Post Management**: The platform enables users to create, edit, and delete posts, fostering dynamic content creation.

**Engagement**: Users can interact with posts by liking and reposting, enhancing social interaction and engagement.

<br>

#### Acknowledgments:

I'd like to express my gratitude to **JavaScript Mastery**. Their tutorial served as the initial inspiration for starting this project and provided valuable insights, even though I may have diverged from their course of action.
