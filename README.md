# 📚 Library System (Open Access + Geolocation)

Aplikasi Backend & Frontend sederhana untuk manajemen perpustakaan. Fitur utama meliputi **CRUD Buku** dan **Peminjaman dengan Geolokasi**. Sistem ini menggunakan metode **Open Access** (Tanpa Login/Register) untuk kemudahan penggunaan.

---

## 🛠️ 1. Persiapan Awal (Prasyarat)
Pastikan di komputer Anda sudah terinstal:
1.  **Node.js** (Minimal v14).
2.  **XAMPP** (Pastikan module **MySQL** sudah dinyalakan).
3.  **Browser** (Chrome / Edge) untuk membuka aplikasi.

---

## 🚀 2. Cara Menjalankan Aplikasi

Jika Anda baru saja mengekstrak folder ini, ikuti langkah berikut agar aplikasi bisa berjalan:

### Langkah 1: Instalasi Dependency
Folder `node_modules` biasanya tidak disertakan karena ukurannya besar. Anda harus menginstalnya manual.
1.  Buka Terminal / CMD di dalam folder proyek ini.
2.  Ketik perintah:
    ```bash
    npm install
    ```
3.  Tunggu hingga proses selesai.

### Langkah 2: Buat Database
1.  Buka **phpMyAdmin** (`http://localhost/phpmyadmin`).
2.  Buat database baru (kosong) dengan nama: **`library_db`**.
    * *Catatan: Tidak perlu import tabel. Sistem akan membuatnya otomatis.*

### Langkah 3: Konfigurasi Environment (.env)
1.  Buat file baru bernama `.env` di folder utama proyek.
2.  Isi dengan kode berikut:
    ```env
    PORT=3000
    
    # Konfigurasi Database MySQL
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASS=          <-- Kosongkan jika pakai XAMPP default
    DB_NAME=library_db
    DB_PORT=3306
    ```

### Langkah 4: Jalankan Server
Kembali ke terminal, jalankan perintah:
```bash
node app.js
```



**Base URL:** `http://localhost:3000/api`

### A. Manajemen Buku (CRUD)
Digunakan oleh halaman Admin untuk mengelola data buku.

| Method | Endpoint | Body (JSON) | Deskripsi |
| :--- | :--- | :--- | :--- |
| **GET** | `/books` | - | Mengambil semua daftar buku |
| **POST** | `/books` | `{"title": "Judul", "author": "Penulis", "stock": 10}` | Menambahkan buku baru |
| **PUT** | `/books/:id` | `{"title": "Judul Baru", "author": "Penulis", "stock": 10}` | Mengupdate data buku berdasarkan ID |
| **DELETE**| `/books/:id` | - | Menghapus buku berdasarkan ID |
| **GET** | `/logs` | - | Melihat seluruh riwayat peminjaman user beserta koordinatnya. |

**1. Menambah Buku Baru**
* **Method:** `POST`
* **URL:** `http://localhost:3000/api/books`
* **Body (JSON):**
  ```json
  {
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "stock": 15
  }

`TAMPILAN ENDPOINT THUNDERCLIENT`

UNTUK PUBLIK
* http://localhost:3000/api/books (GET)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5e55bc16-da2b-48ca-9165-a38545ab1f90" />

* http://localhost:3000/api/books/2 (GET) DETAIL
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9c540439-54ce-4813-a0f0-1d403843671a" />

UNTUK MODE ADMIN
* http://localhost:3000/api/books (POST)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b6b1451b-d98c-46eb-b5f9-82870e9e7732" />

* http://localhost:3000/api/books/3 (DELETE)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/da03f1a2-ef4a-4e1c-8f6c-433c18b42916" />

* http://localhost:3000/api/books/4 (PUT/UPDATE)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/418cb659-5547-48b8-b8da-23a89c3a5cd2" />

* http://localhost:3000/api/logs
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/67e46748-47a2-45ed-aeda-8270ef184718" />


## TAMPILAN UI WEB ADMIN & LOGS PEMINJAMAN BUKU
* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a9e90789-ae3e-4005-9af4-e597f13831c4" />
* <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/baf65123-6e1e-4ea2-852d-cd8542e84f34" />


## TAMPILAN DI WEB JIKA MENGGUNAKAN http://localhost:3000/api/books TANPA UI
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2051cc0e-2754-4051-b485-04dc1b624691" />






### B.Peminjaman USER
Digunakan oleh halaman User untuk meminjam dan halaman Admin untuk melihat riwayat.

| Method | Endpoint | Body (JSON) | Deskripsi |
| :--- | :--- | :--- | :--- |
| **POST** | `/borrow` | `{"bookId": 1, "latitude": -6.2, "longitude": 106.8}` | Meminjam buku. Sistem otomatis mencatat User sebagai "Tamu" (ID 1). |


---

**2. Meminjam Buku (Simulasi User)**

Method: POST

URL: http://localhost:3000/api/borrow

Body (JSON):

```JSON
{
  "bookId": 1,
  "latitude": -6.175392,
  "longitude": 106.827153
}
```

KHUSUS USER / PEMINJAMAN BUKU 
* http://localhost:3000/api/borrow
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2c923a28-2f1a-4bd6-8845-01fbacdbca01" />


## TAMPILAN UI WEB USER
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/855d5b6a-a7de-4342-a653-03556f748597" />




