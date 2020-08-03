
[DB Design]("https://dbdesigner.page.link/FNCqKX4MJfZ8tFEu5")

# Features

- list of roles
    - CRUD
- list of users
    - CRUD
- list of tickets
    - CRUD
- list of categories
    - CRUD
- list of notes
    - CRUD




## Roles

|Feaure|Method|URL|
|:--|:--|:--|
|List Roles|GET|/api/roles|
|Add Role|POST|/api/roles|
|Update Role|PUT|/api/roles/:id|
|Delete Role|DEL|/api/roles/:id|

- id
- admin
- staff
- user

## Users

|Feaure|Method|URL|
|:--|:--|:--|
|List Users|GET|/api/users|
|Add User|POST|/api/users|
|View User|GET|/api/users/:id|
|Update User|PUT|/api/users/:id|
|Delete User|DEL|/api/users/:id|

- id
- name
- email
- password
- roles


## Tickets

|Feaure|Method|URL|
|:--|:--|:--|
|List Tickets|GET|/api/tickets|
|Add Ticket|POST|/api/tickets|
|View User's tickets|GET|/api/users/:id/tickets|
|Update Ticket|PUT|/api/tickets/:id|
|Delete Ticket|DEL|/api/tickets/:id|

## Categories

|Feaure|Method|URL|
|:--|:--|:--|
|List Categories|GET|/api/categories|
|Add Category|POST|/api/categories|
|Update Category|PUT|/api/categories/:id|
|Delete Category|DEL|/api/categories/:id|

- id
- name

## Notes

|Feaure|Method|URL|
|:--|:--|:--|
|List Notes|GET|/api/notes|
|Add Note|POST|/api/notes|
|View User's Notes|GET|/api/users/:id/notes|
|View Ticket's Notes|GET|/api/tickets/:id/notes|
|Update Notes|PUT|/api/notes/:id|
|Delete Note|DEL|/api/notes/:id|




## Testing

- functions: invoke the function with optional arguements
- 
