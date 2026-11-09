# AI Usage Report

This file explains how I used AI during the challenge, including the parts where I followed its suggestions and the parts where I changed or rejected them.

## 1. Tools and Models

| Tool | Model | How I used it | Frequency |
|---|---|---|---|
| Claude Code (desktop app) | Claude Opus 5.5 at the beginning, then Claude Sonnet 5.5 | Planning, implementation, debugging, tests, code review and Git-related tasks | Throughout the challenge |

I switched models during the work using `/model`.

## 2. Stages of Development

### Planning and requirements

I first asked Claude to read the README and help me break the task into smaller steps. It suggested a plan covering the project setup, form schema, validation, API mocking, field components, tests and documentation.

I used that plan as a checklist, not as a design I had to follow exactly. For example, I decided to add validation information to the schema because the sample response in the README did not provide a clear way to mark a field as required.

I also asked for explanations before adopting some suggestions. MSW was one example: I asked what it does and how it works, then decided to use it.

### Scaffolding and setup

AI helped me with a few setup issues: GitHub authentication, npm registry configuration, and setting up the project with Vite, React, TypeScript, Vitest and Testing Library.

I ran the commands myself and checked that everything worked.

### Implementation

I followed the plan suggested by AI for some parts of the project, but made changes as the implementation evolved.

API: I first implemented api/forms.ts using fake functions that returned the mock data. After deciding to use MSW, I changed it to use fetch so MSW could intercept the requests.

Tests: I asked AI to write tests for DynamicForm and the utility functions. I reviewed the tests and, whenever they seemed too complicated, asked AI to simplify them and make them easier to understand.

### Key technical decisions

- **Validation rules built from the schema:** the server decides which rules apply to each field, so a form can be changed on the server without changing the app. A small helper (`getRules`) turns those rules into `react-hook-form` rules. I added a `validation` object to the schema because the README sample had no way to mark a field as required.
- **`FormData` for sending:** JSON cannot carry files, while `FormData` sends text and files together. A file field with several files sends them all under the same field name.
- **`submit` stays in `DynamicForm`, only `toFormData` is separate:** `submit` needs `reset`, `setError` and the success state of the component, so moving it out would mean passing all of them around. Building the `FormData` does not depend on React, so it is a plain function that is easy to test.
- **MSW starts only in development:** the mock server is needed only until the real backend exists. The API code already uses real `fetch` calls, so nothing in the app has to change later, and the production build does not start the mock worker.
- **A toast instead of a plain message:** a message under the button was easy to miss, especially on a long page. The toast is fixed at the top of the window, hides itself after 5 seconds, and keeps `role="status"` so screen readers announce it.

### Debugging

AI helped me investigate setup and integration problems, especially the npm registry issue and the MSW integration.

One important mistake was the advice to use the browser's Offline option to test a network failure. That did not work in this setup because the MSW Service Worker was intercepting the request and returning a local mocked response. I also tried the built-in browser in Claude Code, but it could not register Service Workers.

### Code review and refactoring

I asked AI to review the MSW integration after setting it up. It found that `api/forms.ts` was still calling the old fake functions, which meant MSW would not receive the requests. I changed the API code to use `fetch`.

## 3. Prompts

These are the main prompts, not every message I sent.

### Prompt 1 — Planning / Requirements Analysis

**Prompt**

```text
I should do a task in this repository
I wanna set a plan for it based on the instruction which is in readme
what should I do?
I wanna do it myself but I do not have limitation to use AI
tell me what are the steps an what should I do
```

**Result:** Claude read the README and `sample.ai.md` and suggested a step-by-step plan for the project.

**Evaluation:** I used the plan to organise the work and checked the steps against the task requirements.

**Fixes:** I treated it as a starting point. I made decisions as I learned more about the requirements instead of following every suggestion automatically.

### Prompt 2 — Scaffolding / Git setup

**Prompt**

```text
این ارور رو میگیرم

Username for 'https://github.com': leilasoleimani2000
Password for 'https://leilasoleimani2000@github.com':
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/leilasoleimani2000/react-sdui-challenge.git/'
```

*(English: I get this error.)*

**Result:** Claude explained that GitHub no longer supports account passwords for Git operations and suggested using `gh auth login`.

**Evaluation:** I followed the steps and was able to push afterward.

**Fixes:** None needed.

### Prompt 3 — Scaffolding / npm registry

**Prompt**

```text
خودت هر جا نیاز بود فایل لاگ رو آپیدت کن|
الان با دستور اول این ارور رو گرفتم

npm create vite@latest . -- --template react-ts
npm error code ENOTFOUND
npm error network request to <internal-registry> failed, reason: getaddrinfo ENOTFOUND <internal-registry>
[some lines of the error output are left out here]
```

*(English: Update the log file yourself whenever needed. I got this error with the first command.)*

**Result:** Claude found that my `~/.npmrc` pointed to an internal Nexus registry that could not be reached from my machine, and confirmed that `registry.npmjs.org` was reachable. Its attempt to add a project `.npmrc` was blocked by the permission system, so the registry change was left to me.

**Evaluation:** The cause matched the error message.

**Fixes:** I used the --registry flag in the commands

### Prompt 4 — Planning / Understanding MSW

**Prompt**

```text
rtl رو توی پاسخ هایی که میدی رعایت کن
اول برام توضیح بده msv چیکار میکنه و چجوری باید ازش استفاده کرد
بعدا بهت میگم اضافه بشه یا نه
```

*(English: Write your answers in RTL-friendly form. First explain what MSW does and how to use it. I'll tell you later whether to add it.)*

**Result:** Claude explained that MSW answers `fetch` calls with mocked responses through a Service Worker, listed the setup steps (install, handlers, worker, start in `main.tsx`) and how it is used in tests.

**Evaluation:** I read the explanation first and only then decided to add MSW, so I understood what I was adding.

**Fixes:** None. I set MSW up myself afterwards.

### Prompt 5 — Scaffolding / Installing MSW

**Prompt**

```text
برای نصب فک کنم باید رجیستری هم بدی
```

*(English: I think you also need to pass the registry for the install.)*

**Result:** Claude checked the npm configuration instead of assuming. The default registry was still the unreachable internal Nexus, while `registry.npmjs.org` was reachable and `package-lock.json` already used it. It suggested passing `--registry=https://registry.npmjs.org/` for that one install command, so `~/.npmrc` stays unchanged.

**Evaluation:** I had noticed the problem and Claude had missed it in its first explanation. It confirmed my point with real checks.

**Fixes:** I installed MSW with the `--registry` flag.

### Prompt 6 — Code review / MSW integration

**Prompt**

```text
خب کارای msw رو انجام دادم
فقط بررسی کن کجا دیگه باید تغییر بدم که این درست کار کنه
```

*(English: I did the MSW steps. Check where else I need to change things for it to work.)*

**Result:** Claude found that the MSW files were correct but `api/forms.ts` still called the old fake functions, so MSW would never receive a request. It also listed smaller points, such as error handling and a wrong comment in `vite.config.ts`.

**Evaluation:** I checked the finding by reading `api/forms.ts`, and the type-check, build and tests still passed.

**Fixes:** I changed `api/forms.ts` to use `fetch`.

### Prompt 7 — Testing

```text
 تست هایی که نوشتی رو میخوام ساده تر کنی و خیلی پیچیده نباشه
```

*(English: I also want you to make the tests you wrote simpler, not too complicated.)*

**Result:** Claude had written the first version of the tests earlier, covering `getRules` and the main behaviours of `DynamicForm`. In this answer it cut them down: no nested `describe`, no fake timers and no manually controlled promises.

**Evaluation:** The first version was too complicated for me to follow and explain, so I asked for a simpler one. The new tests pass together with the type-check, lint and build.

**Fixes:** The tests are shorter and easier to read. The test for the toast hiding after 5 seconds was dropped to keep them simple.

### Prompt 8 — Debugging / Offline test

**Prompt**

```text
offline کردم ولی هنوز فرم ثبت میشه و نتورک ار.ور نمیده
```

*(English: I went offline but the form is still submitted and no network error shows.)*

**Result:** Claude explained that the MSW Service Worker answers the request locally, so the browser's Offline option cannot break it. It admitted that its earlier advice to test with Offline was wrong for this setup.

**Evaluation:** The explanation matched what I saw in the browser.

**Fixes:** I did not use Offline mode any more. The failing-request case is covered by a test of `DynamicForm` instead.

## 4. Token Usage Monitoring

- **Method:** I checked the usage shown in the Claude desktop app (plan limits and context window). I did not use a separate tool.
- **Usage:** The weekly limit went from 84% to 87% during the work, about 3 percentage points (the numbers are rounded and include any other activity on my account). The 5-hour window showed 14%, and the context of the main session was about 200k tokens (20% of its window) when I checked.
- **Exact total:** The app shows percentages only, so I cannot give an exact token count.
- **Management:** I used two main sessions, started no subagents, and switched from Claude Opus 5.5 to Claude Sonnet 5.5 during the work.