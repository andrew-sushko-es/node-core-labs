# Node.js Core Labs

Практический курс по Node.js Runtime, асинхронности и встроенным модулям.

## Как мы учимся

1. Изучаем одну концепцию и разбираем, зачем она нужна и как работает.
2. Смотрим небольшие примеры, не подменяя ими самостоятельное решение.
3. Выполняем одно практическое задание за раз.
4. Проводим code review: корректность, читаемость, граничные случаи и особенности runtime.
5. Фиксируем результат и переходим к следующей теме.

**Правило:** готовое решение не выдаётся до первой самостоятельной попытки. Сначала — небольшие подсказки, затем review и обсуждение альтернатив.

## Учебный маршрут

| Этап | Темы | Статус |
|---|---|---|
| 01. Runtime fundamentals | Node.js runtime, V8, libuv, process, environment, CommonJS и ES Modules | В работе |
| 02. Asynchronous programming | Event Loop, timers, microtasks, callbacks, Promises, async/await | Запланирован |
| 03. Events and concurrency | EventEmitter, concurrency vs parallelism, Worker Pool, Worker Threads, Child Processes | Запланирован |
| 04. Files and data | fs, fs/promises, path, url, os, Buffer | Запланирован |
| 05. Streams and CLI | Readable/Writable/Transform, backpressure, readline, zlib | Запланирован |
| 06. Networking | http, https, fetch, net, dns, tls, AbortController | Запланирован |
| 07. Reliability and security | Errors, assert, crypto, util, input validation | Запланирован |
| 08. Testing and diagnostics | node:test, perf_hooks, v8, debugging, profiling | Запланирован |

## Сквозной проект

Постепенно создадим **Warehouse Event Processor** — приложение для обработки событий складской системы. Оно вырастет от CLI-утилиты до приложения, которое читает большие файлы потоками, агрегирует события и предоставляет HTTP API.

## Технические правила

- Используем встроенные модули Node.js; сторонние зависимости добавляем только по отдельному согласованию.
- Для встроенных модулей используем явный префикс `node:`, например `node:fs` и `node:path`.
- Не смешиваем несколько новых концепций в одном задании без необходимости.
- Для каждого задания фиксируем условие, критерии готовности и вопросы для самопроверки.
- Не коммитим секреты, локальные настройки и временные файлы.

## Прогресс

- [ ] Lesson 01 — Runtime Inspector
- [ ] Lesson 02 — Process and Environment
- [ ] Lesson 03 — CommonJS and ES Modules
- [ ] Lesson 04 — Event Loop

## Первый шаг

Начни с [Lesson 01 — Runtime Inspector](./01-runtime/README.md).
