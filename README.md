# Assess Me Security SPIKE

The objective of this project is to develop the security mechanisms which allow an internal sales person to login into the application and see the results of an assessment.

This POC has a couple parts.


## React Web application
This component is a React application which uses the Firebase AUTH api to implement a passwordless login in combination with React Router.

## Firestore rules
This component provides rules creating the ability to limit access to data based on specific domains.


# TO run this POC

```
> cd webapp && npm run start
```