
[DB Design]("https://dbdesigner.page.link/FNCqKX4MJfZ8tFEu5")

[TRELLO]("https://trello.com/b/dyw0n1Cj/%F0%9F%90%9Btracker")

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

## TODO
08/18
- ticketValidation on tickets and notes ✅
- validation on promises? ✅
08/19
- include tried in tickets table ✅
- ticket started linked to first note creation ✅
- ticket endpoint to handle resolved (that way less to do FE) ✅
- get all open tickets ✅
- get all closed tickets ✅
08/20
- link categories to tickets (FK) ✅
- aws training at 1pm ✅
- note user check Mw - user_id and ticket_user-id are not the same, unless admin
- user.id === ticket.user_id
- ticket.id === note.ticket_id

### INCLUDING
- testing 😭
- middleware that validates user's role
    - need role_id in token for



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


## Authentication
|Feaure|Method|URL|
|:--|:--|:--|
|Add User|POST|/api/auth/register|
|Login|POST|/api/auth/loign|

## Users

|Feaure|Method|URL|
|:--|:--|:--|
|List Users|GET|/api/users|
|View User|GET|/api/users/:id|
|Update User|PUT|/api/users/:id|
|Delete User|DEL|/api/users/:id|

- id = int
- name = str
- email = str
- password = str
- roles = []


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
