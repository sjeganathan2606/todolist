# 📝 My Todo List

A beautiful, modern, and responsive todo list application built with React and Material-UI. Organize your tasks efficiently with a clean and intuitive user interface.

![Todo List App](https://img.shields.io/badge/React-18.0-blue) ![Material-UI](https://img.shields.io/badge/Material--UI-5.0-purple) ![Vite](https://img.shields.io/badge/Vite-5.0-yellow)

## ✨ Features

- **Beautiful UI**: Modern Material Design interface with smooth animations
- **Add Tasks**: Quickly add new tasks with the enter key or button
- **Edit Tasks**: Click the edit icon to modify existing tasks
- **Mark Complete**: Check off completed tasks with visual feedback
- **Delete Tasks**: Remove tasks you no longer need
- **Persistent Storage**: Your tasks are saved locally and persist between sessions
- **Task Statistics**: View total, completed, and remaining task counts
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Notifications**: Get instant feedback for all actions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React** - A JavaScript library for building user interfaces
- **Material-UI** - React components implementing Google's Material Design
- **Vite** - Next generation frontend build tool
- **Local Storage** - For persistent data storage

## 📱 Screenshots

### Main Interface
The clean and modern interface makes task management a pleasure.

### Task Management
- Add tasks with the input field and "Add Task" button
- Edit tasks by clicking the edit icon
- Mark tasks as complete with the checkbox
- Delete tasks with the delete icon

## 🎯 Usage

1. **Adding a Task**: Type your task in the input field and press Enter or click "Add Task"
2. **Completing a Task**: Click the checkbox next to any task to mark it as complete
3. **Editing a Task**: Click the edit icon to modify the task text
4. **Deleting a Task**: Click the delete icon to remove a task permanently
5. **View Statistics**: Check the progress bar and statistics at the bottom

## 🚀 Deployment

### Deploy to GitHub Pages

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add the following to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/todo-list",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update your `vite.config.js` for GitHub Pages:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/todo-list/'
})
```

4. Deploy:
```bash
npm run deploy
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify](https://netlify.com)

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the beautiful React components
- [React](https://reactjs.org/) for the amazing JavaScript library
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/todo-list](https://github.com/yourusername/todo-list)

---

⭐ If you found this project helpful, please give it a star on GitHub!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
