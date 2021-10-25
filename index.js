import { useSubject, useMounted, render, useElement } from "./react.js";

render(App, {}, document.getElementById("root"));

export function App() {
    const el = useElement();
    const todos = useSubject([]);
    const search = useSubject("");
    const filter = useSubject("all");

    search.subscribe(() => {
        render(
            TodoList,
            { todos, search, filter },
            el.querySelector("#todo-list")
        );
    });

    filter.subscribe(() => {
        render(
            TodoList,
            { todos, search, filter },
            el.querySelector("#todo-list")
        );
    });

    todos.subscribe(() => {
        render(
            TodoList,
            { todos, search, filter },
            el.querySelector("#todo-list")
        );
    });

    useMounted(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then((r) => r.json())
            .then((data) => {
                todos.next(data);
            });

        el.querySelector('[placeholder="search"]').addEventListener(
            "keyup",
            (event) => [search.next(event.target.value)]
        );
    });

    return `
        <input type="text" >
        <button>add</button>
        <br>
        <input type="text" placeholder="search" >

        <div>
            <label>
                <input type="radio" name="showmode" />
                All
            </label>
            <label>
                <input type="radio" name="showmode" />
                Active
            </label>
            <label>
                <input type="radio" name="showmode" />
                Completed
            </label>
        </div>
        <div id="todo-list">Loading...</div>
    `;
}

export function TodoList({ todos, search, filter }) {
    const el = useElement();

    useMounted(() => {
        const elems = el.querySelectorAll(".todo-item");

        todos.value
            .filter((item) => {
                if (search.value === "") {
                    return true;
                } else {
                    return item.title.includes(search.value);
                }
            })
            .forEach((todo, index) => {
                render(TodoItem, todo, elems[index]);
            });
    });

    return todos.value
        .filter((item) => {
            if (search.value === "") {
                return true;
            } else {
                return item.title.includes(search.value);
            }
        })
        .map((todo) => `<div class="todo-item"></div>`)
        .join("");
}

export function TodoItem({ id, title, completed }) {
    return `
        <input type="checkbox" ${completed ? "checked" : ""} >
        <label>${title}</label>
        <button>remove</button>
    `;
}
