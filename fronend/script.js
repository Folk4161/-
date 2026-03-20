// โหลดข้อมูลจาก LocalStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// ดึง element
const list = document.getElementById("list");
const search = document.getElementById("search");
const filterType = document.getElementById("filterType");

// 🔄 แสดงสินค้า
function render() {
    list.innerHTML = "";

    const keyword = search.value.toLowerCase();

    let filtered = products.filter(p => {
        const matchTitle = p.title.toLowerCase().includes(keyword);
        const matchType = filterType.value === "" || p.type === filterType.value;
        return matchTitle && matchType;
    });

    // ❌ ไม่มีสินค้า
    if (filtered.length === 0) {
        list.innerHTML = `
            <p style="text-align:center; color:#888; margin-top:20px;">
                😢 ยังไม่มีสินค้า
            </p>
        `;
        return;
    }

    // ✅ แสดงสินค้า
    filtered.forEach(p => {
        list.innerHTML += `
        <div class="card product">
            <img src="${p.img || 'https://via.placeholder.com/300'}">
            
            <h3>${p.title}</h3>
            
            <p>${p.desc || ''}</p>
            
            <p>📦 ${p.category || '-'}</p>
            
            <b>
                ${p.type === 'sell' 
                    ? '💰 ' + (p.price || 0) + ' บาท' 
                    : '🔄 แลกสินค้า'}
            </b>

            <p>📞 ${p.contact || '-'}</p>

            <div class="actions">
                <button onclick="viewDetail(${p.id})">👁 ดู</button>
            </div>
        </div>
        `;
    });
}

// 👁 ดูรายละเอียดสินค้า
function viewDetail(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    alert(
        "📦 " + product.title + "\\n\\n" +
        "รายละเอียด: " + (product.desc || '-') + "\\n" +
        "หมวดหมู่: " + (product.category || '-') + "\\n" +
        (product.type === 'sell'
            ? "ราคา: " + product.price + " บาท\\n"
            : "ประเภท: แลกสินค้า\\n") +
        "ติดต่อ: " + (product.contact || '-')
    );
}

// 🔎 ค้นหา
search.oninput = render;

// 🔽 กรอง
filterType.onchange = render;

// โหลดครั้งแรก
render();