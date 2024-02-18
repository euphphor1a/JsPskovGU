async function fetchTodosAndUsers() {
  let usersRequest = new XMLHttpRequest();
  usersRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
  usersRequest.send();

  usersRequest.onload = function () {
    if (usersRequest.status === 200) {
      let users = JSON.parse(usersRequest.responseText);

      let todosRequest = new XMLHttpRequest();
      todosRequest.open('GET', 'https://jsonplaceholder.typicode.com/todos');
      todosRequest.send();

      todosRequest.onload = function () {
        if (todosRequest.status === 200) {
          let todos = JSON.parse(todosRequest.responseText);

          if (todos && Array.isArray(todos) && todos.length > 0) {
            todos.forEach((todo, index) => {
              let row = '<tr>';
              let user = users.find((user) => user.id === todo.userId);

              row += '<td>' +(Number(index) + 1) + '</td>';
              if (user) {
                row += '<td>' + user.name + '</td>';
              }
              row += '<td>' + todo.title + '</td>';
              row += '<td><input class="form-check-input" type="checkbox" ' + (todo.completed ? 'checked' : '') + '></td>';
              row += '</tr>';
              $('table tbody').append(row);
            });
          }
        } else {
          console.error('Ошибка =(');
        }
      };
    }
  };
}
