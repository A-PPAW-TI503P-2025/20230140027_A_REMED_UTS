# Remedial UTS PAW - Library System with Geolocation

Backend sederhana untuk manajemen perpustakaan dengan fitur peminjaman berbasis lokasi, dibangun menggunakan Node.js, Express.js, dan Sequelize (MySQL).

## Fitur

- **Public:** Melihat daftar buku.
- **Admin:** CRUD Buku (Tambah, Edit, Hapus).
- **User:** Meminjam buku dengan pencatatan koordinat lokasi (Latitude & Longitude).
- **Role Simulation:** Otentikasi sederhana menggunakan **HTTP Headers** (Tanpa Login Page).

## Persyaratan

* Node.js & NPM
* MySQL Server (XAMPP / Workbench)
* Postman / Thunder Client (Untuk testing)

## Cara Instalasi

1.  **Clone repo atau copy project ini.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Konfigurasi Database:**
    * Buat file `.env` di folder root.
    * Isi konfigurasi seperti di bawah ini:
        ```env
        DB_NAME=library_db
        DB_USER=root
        DB_PASS=
        DB_HOST=127.0.0.1
        DB_PORT=3306
        PORT=3000
        ```
    * Pastikan database kosong bernama `library_db` sudah dibuat di MySQL Anda.
        ```sql
        CREATE DATABASE library_db;
        ```

## Cara Menjalankan

1.  **Jalankan Server:**
    ```bash
    node app.js
    ```
    *Tabel database akan dibuat otomatis saat server berjalan.*

2.  **Server Berjalan:**
    Akan berjalan di `http://localhost:3000`.

## API Documentation & Cara Test

Karena ini adalah **Backend API**, pengujian dilakukan menggunakan **Postman** atau **Thunder Client**.

### Headers Penting (Simulasi Auth)

Sistem tidak menggunakan Login page, melainkan simulasi via Header:

* **Admin Access:**
    * Key: `x-user-role` | Value: `admin`
* **User Access:**
    * Key: `x-user-role` | Value: `user`
    * Key: `x-user-id`   | Value: `101` (ID User Simulasi)

### Endpoints

#### 1. Books (Buku)

* **GET** `/api/books` (Public)
    * Mendapatkan semua daftar buku.
* **GET** `/api/books/:id` (Public)
    * Mendapatkan detail satu buku.
* **POST** `/api/books` (Admin Only)
    * Headers: `x-user-role: admin`
    * Body:
        ```json
        {
          "title": "Harry Potter",
          "author": "J.K. Rowling",
          "stock": 10
        }
        ```
* **PUT** `/api/books/:id` (Admin Only)
    * Headers: `x-user-role: admin`
    * Body: `{ "title": "Judul Baru", ... }`
* **DELETE** `/api/books/:id` (Admin Only)
    * Headers: `x-user-role: admin`

#### 2. Borrow (Peminjaman)

* **POST** `/api/borrow` (User Only)
    * Headers:
        * `x-user-role: user`
        * `x-user-id: 101`
    * Body:
        ```json
        {
          "bookId": 1,
          "latitude": -6.200000,
          "longitude": 106.816666
        }
        ```
    * **Logic:** Sistem akan mengecek stok buku. Jika ada, stok berkurang -1 dan lokasi user dicatat di tabel log.

## Struktur Database

* **Books:** `id`, `title`, `author`, `stock`, `createdAt`, `updatedAt`
* **BorrowLogs:** `id`, `userId`, `bookId`, `borrowDate`, `latitude`, `longitude`, `createdAt`, `updatedAt`

## Struktur Project

```text
/config      -> Konfigurasi Database (Sequelize)
/controllers -> Logic handler (Buku & Peminjaman)
/middleware  -> Auth check (Cek Role Admin/User)
/models      -> Sequelize Models (Schema Tabel)
/routes      -> API Routes (Endpoint URL)
app.js       -> Entry point & Server Setup
.env         -> Environment Variables
README.md    -> Dokumentasi Proyek