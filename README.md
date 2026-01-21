# 🛍️ Trendora E-Commerce

**Trendora** is a full-stack fashion e-commerce application built to provide a seamless shopping experience. It features a secure administrative dashboard, dynamic product management, and a responsive user interface for customers.

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
2.  Create a database named `trendora`.
3.  The tables will be automatically created by Hibernate when you run the backend.

### **3. Backend Setup (Spring Boot)**
```bash
# Navigate to the backend folder
cd backend

# Open src/main/resources/application.properties and update your DB credentials:
# spring.datasource.username=your_postgres_username
# spring.datasource.password=your_postgres_password

# Run the application
mvn spring-boot:run
The Backend will start on http://localhost:8080


