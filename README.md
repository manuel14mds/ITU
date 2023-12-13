# Information Technology University
## _Angular Project_

## Description
The University Management System is a web application developed with the Angular 16 framework. This platform is designed to facilitate the administration of students, professors, and courses at the Information Technology University (ITU).

It is an administrative software that allows users to perform CRUD operations (Create, Read, Update, Delete) on each of the system entities and manage the relationships between them. The application provides an intuitive and efficient interface for the effective handling of academic data.

Additionally, it features an authentication layer (auth) that includes registration, login, and user management functions with two levels of access: User and Administrator. This ensures secure and personalized control of the system.

## Deploy
https://exquisite-pasca-fc4fed.netlify.app/
## technologies & Dependencies

The project makes use of the following technologies and tools:
- **Angular 16:** Framework used for the development of the user interface.
- **[Google Firebase]:** For Firestore, I utilized it for data persistence, and Authentication for user management.

Below are some of the key dependencies listed in the `package.json` file:

| Dependency                             | Version         | Description                                       |
|----------------------------------------|-----------------|---------------------------------------------------|
| @angular-devkit/build-angular           | ^16.2.2         | Development kit for building Angular              |
| @angular/cli                           | ~16.2.2         | Angular command-line interface                    |
| @angular/compiler-cli                  | ^16.2.0         | TypeScript compiler for Angular                   |
| @types/jasmine                         | ~4.3.0          | TypeScript types for Jasmine                     |
| typescript                             | ~5.1.3          | TypeScript programming language                  |



## Instalación

To install and run this project on your local environment, follow these steps:

1. **Clone the Repository::**
    ```sh
    git clone https://github.com/manuel14mds/ITU
    ```

2. **Install Dependencies:**
    Navigate to the project's root directory using the terminal and run the following command to install all dependencies:
    
    ```sh
    npm install
    ```
3. **start Development Server:**
    After the installation, start the development server with the following command:
    ```sh
    ng serve -o
    ```

    The `-o` parameter will automatically open the application in your default web browser.

4. **View the Application:**
    The application will be available at `http://localhost:4200/`. Open your browser and go to this address to view and test the application.

That's it! Now you should have the project installed and running in your local environment. If you encounter any issues during installation or have additional questions, feel free to ask.

> **Important Note**
> As I use Firebase for data persistence, you may need to configure Firebase on your machine.
> It should work with the credentials already configured, but if not, below are the steps for configuration.

## Firebase Configuration
Follow these steps to configure Firebase on your machine and use it with an Angular project using AngularFire.
Create a new project in your Firebase account and save the credentials as we'll use them later.


### 1. Log in to Firebase
```sh
    firebase login
```
Log in with your Firebase account.
### 2. List Firebase Projects

```sh
    firebase projects:list
```
List all Firebase projects associated with your account. Take note of the project name you want to use.

### 3. Initialize Firebase in Your Angular Project
```sh
    firebase init
```
- Select Firestore as the Firebase option you want to use.
- Use an existing project.
- Choose the Firebase project you noted earlier.
- Choose the default Firestore rules.
- Accept the default Firestore indexes.
    
### 4. Add AngularFire to the Angular Project
It may work correctly before this step, but if AngularFire has not been added, use the following command:

```sh
    ng add @angular/fire
```
- Select Firestore as the Firebase option you want to add.
- Log in with your Firebase account.
- Choose the Firebase project you configured in previous steps.
- Create a new application (e.g., school-web, shop-web) or select an existing one.



With these steps, you will have configured Firebase on your machine and linked your Angular project to Firebase using AngularFire. Make sure to follow any additional instructions provided during these processes, and your application will be ready to use Firestore and other Firebase features.


## ## Application Access Levels
#### admin credentials
- Email: admin@mail.com
- Password: admin123
#### User Credentials (The application's registration enables a profile with the user role)
- Email: julio@mail.com
- Password: 123456


| Actions                  | Admin   | User         |
|--------------------------|---------|--------------|
| **Teachers**             |         |              |
| *teacher list*           | ✅      | ✅           |
| *add*                    | ✅      | ✅           |
| *edit*                   | ✅      | ✅           |
| *enable*                 | ✅      | ❌           |
| *disable*                | ✅      | ❌           |
| *detail page*            | ✅      | ✅           |
| *deregister course*      | ✅      | ❌           |
|--------------------------|---------|--------------|
| **Students**             |         |              |
| *student list*           | ✅      | ✅           |
| *add*                    | ✅      | ✅           |
| *edit*                   | ✅      | ✅           |
| *enable*                 | ✅      | ❌           |
| *disable*                | ✅      | ❌           |
| *detail page*            | ✅      | ✅           |
| *unenroll course*        | ✅      | ❌           |
|--------------------------|---------|--------------|
| **Courses**              |          |             |
| *course list*            | ✅       | ✅          |
| *add*                    | ✅       | ✅          |
| *edit*                   | ✅       | ✅          |
| *enable*                 | ✅       | ❌          |
| *disable*                | ✅       | ❌          |
| *detail page*            | ✅       | ✅          |
| *class list*             | ✅       | ✅          |
| *add class*              | ✅       | ✅          |
| *remove class*           | ✅       | ✅          |
| *register teacher*       | ✅       | ❌          |
| *enrolled student list*  | ✅       | ✅          |
| *enroll student*         | ✅       | ✅          |
| *unenroll student*       | ✅       | ❌          |

## Author
**Manuel Esteban Florez Lopez**
*Ingeniero de Sistemas*

- Linkedin: https://www.linkedin.com/in/manuel14mds/
- Email: manuel14mds@gmail.com
    
## License
**Free Software, Hell Yeah!**
