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



KHUSUS USER / PEMINJAMAN BUKU
* http://localhost:3000/api/borrow
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2c923a28-2f1a-4bd6-8845-01fbacdbca01" />

BODY HARUS DIISI SEPERTI INI
`{
  "bookId": 2,
  "latitude": -6.200100,
  "longitude": 106.816777
}`
