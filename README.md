# 🛍️ Trendora E-Commerce

![Image Alt](https://github.com/Rash200217/Trendora-Ecommerce/blob/main/Screenshot%201.png?raw=true)
![Image Alt](https://github.com/Rash200217/Trendora-Ecommerce/blob/main/Screenshot%202.png?raw=true)
![Image Alt](https://github.com/Rash200217/Trendora-Ecommerce/blob/main/Screenshot%203.png?raw=true)

**Trendora** is a full-stack fashion e-commerce web application built to provide a seamless shopping experience. It features a secure administrative dashboard, dynamic product management, and a responsive user interface for customers.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Tech Stack

### **Frontend**
* ⚛️ **React.js** - Component-based UI.
* 🎨 **Bootstrap 5** - Responsive styling and layout.
* 📡 **Axios** - API integration.

### **Backend**
* ☕ **Java Spring Boot** - REST API development.
* 🔐 **Spring Security** - Authentication & Password Encryption (BCrypt).
* 🗄️ **Spring Data JPA** - Database interaction.

### **Database**
* 🐘 **PostgreSQL** - Relational database management.

---

## ✨ Features

### **User Features**
* **User Authentication:** Secure Signup & Login with encrypted passwords.
* **Product Browsing:** Filter by categories (Men, Women, Kids) or search by name.
* **Shopping Cart:** Add, remove, and manage items in the cart.
* **Wishlist:** Save favorite items for later.
* **Responsive Design:** Works smoothly on mobile and desktop.
* **ChatBot:** Responds to simple questions.

### **Admin Features**
* **Dashboard:** View real-time statistics (Total Sales, User Count, Product Count).
* **Product Management:** Add, Update, and Safe Delete products.
* **User Management:** View registered users and reset passwords.
* **Homepage Manager:** Add or remove promotional banners from the homepage slider.
* **Security:** Role-based access control protects the Admin Panel.

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

### **1. Prerequisites**
* Node.js & npm installed.
* Java Development Kit (JDK) 17 or higher.
* PostgreSQL installed and running.

### **2. Database Setup**
1.  Open **pgAdmin** or your SQL terminal.
2.  Create a database named `trendora_db`.
3.  The tables will be automatically created by Hibernate when you run the backend.
4.  If not use backup_database file when trendora_db database didnt work properly.
### **3. Backend Setup (Spring Boot)**
```bash
# Navigate to the backend folder
cd backend

# Open src/main/resources/application.properties and update your DB credentials:
# spring.datasource.username=your_postgres_username
# spring.datasource.password=your_postgres_password

# Run the application
mvn spring-boot:run
**Required to copy this link inorder to create a admin account first time: http://localhost:8080/api/auth/emergency-admin
```
### **4. Frontend Setup (React)**
```bash
# Navigate to the frontend folder
cd trendora-frontend

# Install dependencies
npm install

# Start the development server
npm start
The Frontend will open on http://localhost:3000
```
## 🔑 Default Login Credentials
After setting up the database, you can create these users or use the SQL provided in the setup guide.

# Admin:-admin,password123
# User:-user1,password123

Note: Use atleast 8 characters for when creating passwords. Passwords are encrypted in the database. Do not manually insert plain text passwords into SQL.

## 🤝 Contributing
Fork the repository.

Create a new branch (git checkout -b feature-branch).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature-branch).

Open a Pull Request.

## 📝 License
This project is open-source and available under the MIT License.
