# 📁 FileFlow

> A modern desktop file organizer that helps you clean, categorize, and manage your files effortlessly.

**FileFlow** is a modern and lightweight desktop application built with **Electron, React, TypeScript, Vite, and Tailwind CSS**.

It helps you organize messy folders automatically by detecting file types and moving them into appropriate categories such as **Images, Videos, Audio, Documents, Archives, Code, Applications, and Others**.

Everything happens **locally on your computer**.

---

## ✨ Features

* 📂 **Smart File Organization**

  * Automatically categorizes files based on their extensions.

* 🖼️ **Multiple File Categories**

  * Images
  * Videos
  * Audio
  * Documents
  * Archives
  * Code
  * Applications
  * Others

* 📊 **File Statistics**

  * See how many files belong to each category before organizing.

* 🔍 **File Scanning**

  * Scan a selected folder and preview files before moving them.

* 🛡️ **Duplicate File Protection**

  * Prevents accidental overwriting of existing files.

* ↩️ **Undo Last Organization**

  * Reverse the latest organization operation.

* ⚡ **Fast & Lightweight**

  * Designed to handle file operations efficiently.

* 🎨 **Modern Desktop UI**

  * Clean, minimal, and responsive interface.

* 🌙 **Dark Theme**

  * Modern dark interface designed for comfortable use.

* 🔒 **Local & Private**

  * Your files stay on your computer.
  * No file uploads to external servers.

* 🖥️ **Windows Desktop Application**

  * Built with Electron for a native desktop experience.

---

# 🖥️ How to Use FileFlow

Using FileFlow is simple. You don't need to manually organize your files one by one.

## 1. Download FileFlow

Go to the **Releases** section of this GitHub repository and download the latest Windows installer.

Example:

```text
FileFlow-Setup.exe
```

> Download the latest available release.

---

## 2. Install FileFlow

After downloading the installer:

1. Open `FileFlow-Setup.exe`
2. Follow the installation instructions.
3. Launch **FileFlow** from your Desktop or Start Menu.

You don't need Node.js, npm, VS Code, or any development tools to use the installed application.

---

## 3. Select a Folder

Open FileFlow and click:

```text
Choose Folder
```

Select the folder you want to organize.

For example:

```text
C:\Users\YourName\Downloads
```

You can organize folders such as:

* Downloads
* Desktop
* Documents
* Pictures
* Any other folder you have permission to access

---

## 4. Scan Your Files

After selecting a folder, FileFlow will scan the files and identify their categories.

For example:

```text
Images        24
Videos        12
Documents     35
Audio          8
Archives       5
Code           9
Applications   3
Others        12
```

You can review the results before starting the organization.

---

## 5. Organize Your Files

When you're ready, click:

```text
✨ Organize Files
```

FileFlow will create the required category folders automatically and move the files into the appropriate folders.

For example, a messy Downloads folder:

```text
Downloads/
├── photo.jpg
├── movie.mp4
├── song.mp3
├── resume.pdf
├── project.zip
└── app.ts
```

will become:

```text
Downloads/
├── Images/
│   └── photo.jpg
│
├── Videos/
│   └── movie.mp4
│
├── Audio/
│   └── song.mp3
│
├── Documents/
│   └── resume.pdf
│
├── Archives/
│   └── project.zip
│
└── Code/
    └── app.ts
```

---

## 6. Organization Complete 🎉

After the process finishes, FileFlow will show a summary of the operation.

Example:

```text
🎉 Organization Complete

128 files processed successfully.

24 Images
12 Videos
35 Documents
8 Audio
5 Archives
9 Code
3 Applications
32 Others
```

You can then open the organized folder directly from the application.

---

# 📂 Supported File Categories

FileFlow currently supports the following categories.

## 🖼️ Images

```text
.jpg
.jpeg
.png
.gif
.webp
.svg
.bmp
.tiff
```

## 🎬 Videos

```text
.mp4
.mkv
.mov
.avi
.webm
.flv
.wmv
```

## 🎵 Audio

```text
.mp3
.wav
.flac
.m4a
.aac
.ogg
```

## 📄 Documents

```text
.pdf
.doc
.docx
.txt
.xls
.xlsx
.csv
.ppt
.pptx
```

## 📦 Archives

```text
.zip
.rar
.7z
.tar
.gz
```

## 💻 Code

```text
.js
.jsx
.ts
.tsx
.html
.css
.scss
.json
.py
.java
.cpp
.c
.php
```

## ⚙️ Applications

```text
.exe
.msi
.apk
```

## 📁 Others

Any unsupported file extension is automatically placed inside:

```text
Others/
```

---

# 🛡️ Duplicate File Handling

FileFlow does not automatically overwrite existing files.

For example, if the destination already contains:

```text
photo.jpg
```

and another file with the same name needs to be moved, FileFlow can safely create:

```text
photo (1).jpg
photo (2).jpg
photo (3).jpg
```

This helps prevent accidental data loss.

---

# ↩️ Undo

FileFlow keeps track of the latest organization operation.

After organizing files, you can use:

```text
Undo Last Organization
```

to reverse the most recent operation when supported.

This allows files to be moved back to their previous location.

---

# 🔒 Privacy & Security

FileFlow is designed as a **local-first desktop application**.

### Your files remain on your computer.

FileFlow does not:

* ❌ Upload your files
* ❌ Send your files to external servers
* ❌ Modify file contents
* ❌ Automatically delete files
* ❌ Execute unknown files
* ❌ Overwrite existing files without safe handling

File organization happens locally through the desktop application's file-system operations.

---

# ⚠️ Important

FileFlow **moves files** from their original location into categorized folders.

Before organizing important or sensitive files, it is recommended to keep a backup.

For example:

```text
Before:

Downloads/
├── photo.jpg
├── resume.pdf
└── project.zip
```

After organizing:

```text
Downloads/
├── Images/
│   └── photo.jpg
│
├── Documents/
│   └── resume.pdf
│
└── Archives/
    └── project.zip
```

---

# 🛠️ Tech Stack

| Technology      | Purpose                               |
| --------------- | ------------------------------------- |
| ⚛️ React        | User Interface                        |
| 🔷 TypeScript   | Type Safety                           |
| ⚡ Vite          | Development & Build Tool              |
| 🖥️ Electron    | Desktop Application                   |
| 🎨 Tailwind CSS | Styling                               |
| 🟢 Node.js      | File System Operations                |
| 🔌 Electron IPC | Renderer ↔ Main Process Communication |
| 🎯 Lucide React | Icons                                 |

---

# 🧠 How FileFlow Works

The application follows a simple workflow:

```text
┌──────────────────────┐
│     Select Folder    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│      Scan Files      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Analyze Extensions  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Categorize Files    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Show Statistics    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Organize Files     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Create Category      │
│ Folders & Move Files │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Show Results      │
└──────────────────────┘
```

---

# 🏗️ Application Architecture

FileFlow uses Electron's secure architecture.

```text
┌──────────────────────────────┐
│        React Renderer        │
│                              │
│  Components / Pages / UI     │
└──────────────┬───────────────┘
               │
               │ Electron IPC
               ↓
┌──────────────────────────────┐
│         Preload              │
│      Secure API Bridge       │
└──────────────┬───────────────┘
               │
               ↓
┌──────────────────────────────┐
│       Electron Main          │
│                              │
│  Node.js / File System APIs  │
└──────────────────────────────┘
```

The renderer does not directly access Node.js APIs.

Important Electron security settings include:

```text
nodeIntegration: false
contextIsolation: true
```

---

# 📁 Project Structure

```text
fileflow/
│
├── electron/
│   ├── main.ts
│   ├── preload.ts
│   │
│   ├── services/
│   │   ├── fileScanner.ts
│   │   ├── fileOrganizer.ts
│   │   └── fileHistory.ts
│   │
│   └── utils/
│       ├── fileCategories.ts
│       └── duplicateHandler.ts
│
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── FolderDropzone/
│   │   ├── FileStats/
│   │   ├── FileList/
│   │   ├── ProgressBar/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── History/
│   │   └── Settings/
│   │
│   ├── types/
│   │   ├── file.ts
│   │   └── electron.d.ts
│   │
│   ├── utils/
│   │   └── formatFileSize.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 🔷 TypeScript

FileFlow uses TypeScript to make file operations safer and easier to maintain.

Example:

```ts
export type FileCategory =
  | "Images"
  | "Videos"
  | "Audio"
  | "Documents"
  | "Archives"
  | "Code"
  | "Applications"
  | "Others";
```

Example file type:

```ts
export interface FileItem {
  name: string;
  path: string;
  extension: string;
  category: FileCategory;
  size: number;
}
```

This helps maintain predictable data throughout the application.

---

# ⚡ Performance

FileFlow is designed to remain responsive while working with large folders.

The application uses:

* Asynchronous file operations
* Non-blocking processes
* Efficient React state updates
* File metadata instead of reading entire file contents
* Lightweight UI components

The goal is to keep the application fast and responsive even when organizing many files.

---

# 🎨 UI & Design

FileFlow uses a modern dark interface inspired by contemporary developer tools.

Design goals:

* Minimal
* Clean
* Modern
* Fast
* Professional
* Easy to understand

The interface uses:

* Dark background
* Electric blue accents
* Subtle gradients
* Rounded cards
* Smooth transitions
* Clear typography
* Lucide icons

---

# 🚀 Getting Started for Developers

If you want to run FileFlow from the source code instead of downloading the release:

## Requirements

Make sure you have installed:

* Node.js
* npm
* Git

---

## Clone the Repository

```bash
git clone https://github.com/mdmahadih673/fileflow.git
```

---

## Navigate to the Project

```bash
cd fileflow
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development

```bash
npm run dev
```

This will start the development environment and launch the Electron application.

---

# 📦 Build the Application

To create a production build:

```bash
npm run build
```

The project can then be packaged into a Windows desktop installer according to the configured Electron build settings.

---

# 🧪 Development Workflow

A typical development workflow looks like:

```text
1. Start the development server

npm run dev

        ↓

2. Make changes in React / TypeScript

        ↓

3. Test the application

        ↓

4. Build the application

npm run build

        ↓

5. Test the production build

        ↓

6. Create a new release
```

---

# 🗺️ Roadmap

Future improvements planned for FileFlow:

* [ ] Drag & Drop folder support
* [ ] Custom file categories
* [ ] Custom organization rules
* [ ] Advanced file search
* [ ] Duplicate file finder
* [ ] Large file finder
* [ ] Storage analytics
* [ ] Multiple folder organization
* [ ] Scheduled organization
* [ ] Automatic Downloads organization
* [ ] System tray support
* [ ] Windows startup option
* [ ] Light / Dark theme
* [ ] Advanced organization history
* [ ] Cross-platform support
* [ ] macOS support
* [ ] Linux support

---

# 📸 Screenshots

## Dashboard

> Add your application screenshot here.

```text
Coming soon...
```

## File Scanning

> Add your scanning screen screenshot here.

```text
Coming soon...
```

## Organization Complete

> Add your completion screen screenshot here.

```text
Coming soon...
```

---

# 🎯 Why I Built FileFlow

FileFlow was created as a practical desktop application project to learn and apply modern web and desktop development concepts.

Through this project, I explored:

* React
* TypeScript
* Electron
* Node.js File System APIs
* Electron IPC
* Tailwind CSS
* Desktop application architecture
* File categorization
* Safe file operations
* Error handling
* Application state management

The goal was to build something that is not only a learning project, but also a useful everyday desktop utility.

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you want to contribute:

### 1. Fork the repository

### 2. Clone your fork

```bash
git clone YOUR_FORK_URL
```

### 3. Create a new branch

```bash
git checkout -b feature/your-feature
```

### 4. Make your changes

### 5. Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

### 6. Push the branch

```bash
git push origin feature/your-feature
```

### 7. Open a Pull Request

---

# 🐛 Issues & Feedback

If you find a bug or have an idea for a new feature, feel free to open an issue in the GitHub repository.

When reporting a bug, please include:

* Operating system
* FileFlow version
* Steps to reproduce the issue
* Expected behavior
* Actual behavior
* Screenshot if applicable

---

# ⭐ Support the Project

If you like FileFlow or find it useful, consider giving the repository a ⭐ on GitHub.

Your support helps motivate further development.

---

# 👨‍💻 Author

## Md. Mahadi Hasan

MERN Stack Web Developer

GitHub: **[@mdmahadih673](https://github.com/mdmahadih673)**

---

# 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute the project according to the terms of the license.

---

## 💙 FileFlow

**Clean your folders. Organize your files. Keep your workspace simple.**

> Built with React, TypeScript, Electron, and a lot of curiosity.
