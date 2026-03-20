let products = JSON.parse(localStorage.getItem("products")) || [];

const list = document.getElementById("list");
const search = document.getElementById("search");
const filterType = document.getElementById("filterType");

// แสดงสินค้า
function render() {
    list.innerHTML = "";

    const keyword = search.value.toLowerCase();

    let filtered = products.filter(p =>
        p.title.toLowerCase().includes(keyword) &&
        (filterType.value === "" || p.type === filterType.value)
    );

    if (filtered.length === 0) {
        list.innerHTML = "<p style='text-align:center'>ไม่มีสินค้า</p>";
        return;
    }

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

            <div class="actions">
                <button onclick="removeProduct(${p.id})">🗑 ลบ</button>
            </div>
        </div>
        `;
    });
}

// ลบสินค้า
function removeProduct(id) {
    if (confirm("ลบสินค้านี้?")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem("products", JSON.stringify(products));
        render();
    }
}

// ค้นหา + กรอง
search.oninput = render;
filterType.onchange = render;

// โหลดหน้า
render();