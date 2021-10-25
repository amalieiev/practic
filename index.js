import { useSubject, useMounted, render, useElement } from "./react.js";

function Counter() {
    const title = useSubject("Some Title");
    const count = useSubject(0);
    const el = useElement();

    count.subscribe((value) => {
        el.querySelector(".count").innerHTML = `count: ${value}`;
    });

    title.subscribe((value) => {
        console.log(value);
        console.log(title.value);
        el.querySelector(".title").innerHTML = `title: ${title.value}`;
    });

    useMounted(() => {
        el.querySelector(".increment").addEventListener("click", () => {
            count.next(count.value + 1);
        });

        el.querySelector(".decrement").addEventListener("click", () => {
            count.next(count.value - 1);
        });

        el.querySelector("input").addEventListener("keyup", (event) => {
            title.next(event.target.value);
        });

        render(Counter2, {}, el.querySelector(".item"));
    });

    return `
        <input value="${title.value}" type="text" />
        <p class="title">title: ${title.value}</p>
        <p class="count">count: ${count.value}</p>
        <button class="increment">increment</button>
        <button class="decrement">decrement</button>
        <div class="item"></div>
    `;
}

function Counter2() {
    const title = useSubject("Some Onother Title");
    const count = useSubject(10);
    const el = useElement();

    count.subscribe((value) => {
        el.querySelector(".count").innerHTML = `count: ${value}`;
    });

    useMounted(() => {
        el.querySelector(".increment").addEventListener("click", () => {
            count.next(count.value + 1);
        });

        el.querySelector(".decrement").addEventListener("click", () => {
            count.next(count.value - 1);
        });
    });

    return `
        <input value="${title.value}" type="text" />
        <p class="title">title: ${title.value}</p>
        <p class="count">count: ${count.value}</p>
        <button class="increment">increment</button>
        <button class="decrement">decrement</button>
    `;
}

render(Counter, {}, document.getElementById("root"));
render(Counter, {}, document.getElementById("root-2"));
