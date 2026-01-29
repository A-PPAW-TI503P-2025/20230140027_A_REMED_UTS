const API_URL = 'http://localhost:3000/api';

// --- BAGIAN ADMIN ---

async function loadBooksAdmin() {
    document.getElementById('adminPanel').style.display = 'block';
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();
    const list = document.getElementById('dataList');
    
    list.style.display = 'grid'; // Mode Grid
    list.innerHTML = '';

    books.forEach(b => {
        list.innerHTML += `
            <div class="book-card">
                <h3>${b.title}</h3>
                <p>${b.author}</p>
                <p>Stok: <strong>${b.stock}</strong></p>
                <div style="display:flex; gap:5px; margin-top:10px;">
                    <button onclick="openEdit(${b.id}, '${b.title}', '${b.author}', ${b.stock})" style="background:#f1c40f; color:#333">Edit</button>
                    <button onclick="deleteBook(${b.id})" style="background:#e74c3c">Hapus</button>
                </div>
            </div>
        `;
    });
}

async function loadLogs() {
    document.getElementById('adminPanel').style.display = 'none';
    const res = await fetch(`${API_URL}/logs`);
    const logs = await res.json();
    const list = document.getElementById('dataList');
    
    list.style.display = 'block'; // Mode List Panjang
    list.innerHTML = '';

    logs.forEach(log => {
        list.innerHTML += `
            <div class="card" style="border-left:5px solid orange; margin-bottom:10px;">
                <strong>Tamu</strong> meminjam <em>${log.Book ? log.Book.title : 'Buku Dihapus'}</em>
                <br>
                <small>📍 ${log.latitude}, ${log.longitude} | 📅 ${new Date(log.createdAt).toLocaleString()}</small>
            </div>
        `;
    });
}

async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const stock = document.getElementById('stock').value;

    await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, author, stock})
    });
    alert("Buku ditambahkan!");
    loadBooksAdmin();
}

async function deleteBook(id) {
    if(confirm("Hapus buku ini?")) {
        await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' });
        loadBooksAdmin();
    }
}

// Modal Edit Logic
function openEdit(id, title, author, stock) {
    document.getElementById('editId').value = id;
    document.getElementById('editTitle').value = title;
    document.getElementById('editAuthor').value = author;
    document.getElementById('editStock').value = stock;
    document.getElementById('editModal').style.display = 'flex';
}
function closeModal() { document.getElementById('editModal').style.display = 'none'; }

async function saveEdit() {
    const id = document.getElementById('editId').value;
    const body = {
        title: document.getElementById('editTitle').value,
        author: document.getElementById('editAuthor').value,
        stock: document.getElementById('editStock').value
    };
    await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    closeModal();
    loadBooksAdmin();
}


// --- BAGIAN USER ---

async function loadBooksUser() {
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();
    const list = document.getElementById('userBookList');
    list.innerHTML = '';

    books.forEach(b => {
        const isHabis = b.stock < 1;
        list.innerHTML += `
            <div class="book-card">
                <h3>${b.title}</h3>
                <p>${b.author}</p>
                <p>Stok: <strong>${b.stock}</strong></p>
                <button onclick="borrowBook(${b.id})" 
                        style="${isHabis ? 'background:#ccc' : 'background:#2ecc71'}" 
                        ${isHabis ? 'disabled' : ''}>
                    ${isHabis ? 'Habis' : '📍 Pinjam'}
                </button>
            </div>
        `;
    });
}

function borrowBook(id) {
    const status = document.getElementById('gpsStatus');
    if(!navigator.geolocation) return alert("Browser tidak support GPS");

    status.innerText = "🛰️ Sedang mencari lokasi...";

    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const res = await fetch(`${API_URL}/borrow`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    bookId: id,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                })
            });
            const data = await res.json();
            
            if(res.ok) {
                alert(`Sukses! Sisa stok: ${data.sisaStok}`);
                status.innerText = `✅ Lokasi tercatat: ${pos.coords.latitude}, ${pos.coords.longitude}`;
                loadBooksUser(); // Refresh stok
            } else {
                alert(data.message);
            }
        } catch(e) { alert("Error Server"); }
    }, () => {
        status.innerText = "❌ Gagal: Izin lokasi ditolak.";
        alert("Wajib izinkan lokasi!");
    });
}