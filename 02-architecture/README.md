# Lesson 02 — Node.js Runtime Architecture

**Этап:** Runtime fundamentals  
**Оценка времени:** 35–50 минут  
**Зависимости:** Node.js; сторонние пакеты не нужны

## Цель

Построить правильную ментальную модель Node.js: понять роль V8, Node.js APIs, libuv, Event Loop, операционной системы и Worker Pool.

Важно: пока не нужно запоминать все фазы Event Loop. Их разберём отдельно.

## 1. Из каких частей состоит Node.js

Упрощённая модель:

```text
Your JavaScript code
        |
        v
Node.js APIs (process, fs, http, timers, crypto, ...)
        |
        +------------------------+
        |                        |
        v                        v
       V8                      libuv
  JavaScript engine       Event Loop, async I/O,
  execution, heap,        OS integration, Worker Pool
  garbage collection             |
                                 v
                       Operating System
                       sockets, file system,
                       kernel async facilities
```

Это концептуальная схема, а не полная схема внутренних C++ bindings и native layers.

### V8

V8 — JavaScript engine. Он исполняет JavaScript, управляет JavaScript heap и garbage collection. Сам по себе V8 не предоставляет Node.js API вроде `fs.readFile()` или `process`.

### Node.js runtime and APIs

Node.js добавляет к движку V8 возможности серверной и системной среды: доступ к файлам, сети, процессам, таймерам, криптографии и другие APIs. Часть реализации связывает JavaScript API с native C/C++ кодом.

### libuv

libuv — cross-platform библиотека, используемая Node.js для event loop, интеграции с системными механизмами асинхронного I/O, а также для thread pool.

libuv использует разные механизмы в зависимости от платформы. Например, сетевой I/O обычно обслуживается через non-blocking sockets и системный механизм ожидания событий. Некоторые операции, например файловые операции и определённые DNS/crypto/zlib операции, используют Worker Pool.

### Event Loop

Event Loop позволяет Node.js координировать завершение асинхронных операций и запускать соответствующие JavaScript callbacks.

Важная мысль: JavaScript callbacks выполняются в основном JS-потоке по очереди. Event Loop не запускает два обычных JavaScript callbacks одновременно в этом потоке.

### Worker Pool

Worker Pool — пул потоков libuv для определённых задач, которые не обслуживаются подходящим non-blocking механизмом ОС. Это не то же самое, что Worker Threads из Node.js API.

Не каждая асинхронная операция использует Worker Pool. В частности, обычный сетевой I/O и файловые операции устроены по-разному.

## 2. Ключевые различия

| Термин | Ответственность |
|---|---|
| V8 | Исполняет JavaScript |
| Node.js APIs | Предоставляют JavaScript доступ к возможностям runtime |
| libuv | Event Loop, системная интеграция I/O и Worker Pool |
| Event Loop | Координирует callbacks и события |
| Worker Pool | Выполняет определённые задачи в фоновых потоках |
| Worker Threads | Позволяют запускать JavaScript в дополнительных потоках |
| OS kernel | Предоставляет системные механизмы I/O и планирования |

## 3. Главное ограничение: blocking JavaScript

Хотя Node.js умеет выполнять много I/O операций асинхронно, синхронный JavaScript-код выполняется в основном потоке.

Представь, что callback таймера уже должен выполниться, но основной поток занят длинным синхронным циклом. Callback не может прервать текущий JavaScript-код: он выполнится позже, когда поток сможет обработать callbacks.

Это одна из причин, почему CPU-heavy JavaScript может ухудшить отзывчивость HTTP-сервера.

## 4. Практическое задание — Blocking the Event Loop

Создай файл:

```text
02-architecture/
  blocking-demo.js
```

Напиши программу, которая:

1. Выводит `Start`.
2. Планирует callback через `setTimeout(..., 0)`, внутри которого выводит `Timer callback`.
3. Выполняет синхронную CPU-bound работу примерно одну секунду. Не используй `sleep` и не вызывай асинхронные API внутри цикла.
4. После цикла выводит `Sync work finished`.

Формат и способ реализации синхронной работы выбери самостоятельно.

### До запуска — предскажи результат

Запиши ожидаемый порядок трёх сообщений. Объясни, почему callback таймера не может вклиниться в середину синхронной работы.

Затем запусти программу несколько раз и сравни фактический результат с прогнозом.

### Вопросы для самопроверки

1. Какую роль в этом упражнении выполняет V8?
2. Кто отвечает за планирование и последующий вызов timer callback?
3. Почему `setTimeout(..., 0)` не означает «выполни callback прямо сейчас»?
4. Почему синхронный цикл задерживает timer callback?
5. Решит ли проблему перенос этого же цикла в обычную Promise callback? Почему?

## Критерии готовности

- [ ] Создан `02-architecture/blocking-demo.js`.
- [ ] До запуска записан прогноз порядка сообщений.
- [ ] Результат запуска сопоставлен с прогнозом.
- [ ] Объяснена роль V8, Event Loop и основного JS-потока.
- [ ] Понимаешь, почему Promise не превращает CPU-bound JavaScript в параллельную работу.

## Официальные материалы

- [Node.js Event Loop](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Don't Block the Event Loop (or the Worker Pool)](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop)
- [libuv Design Overview](https://docs.libuv.org/en/latest/design.html)

## Что отправить на review

Приложи содержимое `blocking-demo.js`, вывод программы, свой первоначальный прогноз и ответы на вопросы. Не добавляй готовое решение из документации: цель — самостоятельно увидеть поведение runtime.
