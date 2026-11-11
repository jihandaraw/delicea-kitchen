"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const products = [
  { id: "Dimsum Mentai", name: "Dimsum Mentai", category: "Dimsum Mentai", weight: "2 pcs · 110g", price: 108000, oldPrice: 120000, discount: 10, popular: true, image: "/images/dimsum-mentai.png", description: "Dimsum lembut dengan saus mentai gurih, disajikan dengan taburan nori dan wijen." },
  { id: "Dimsum Goreng Keju Lumer", name: "Dimsum Goreng Keju Lumer", category: "Dimsum Mentai", weight: "2 pcs · 110g", price: 26000, oldPrice: 120000, discount: 10, popular: false, image: "/images/dimsum-goreng-keju-lumer.png", description: "Two soft, chewy cookies with toasted milk, pistachio kunafa crunch, and a delicate cocoa finish." },
  { id: "Dimsum Goreng Mentai", name: "Dimsum Goreng Mentai", category: "Dimsum Mentai", weight: "2 pcs · 110g", price: 30000, oldPrice: 120000, discount: 10, popular: false, image: "/images/dimsum-goreng.png", description: "Two soft, chewy cookies with toasted milk, pistachio kunafa crunch, and a delicate cocoa finish." },
  { id: "Special Platter", name: "Special Platter", category: "Dimsum Mentai", weight: "2 pcs · 110g", price: 90000, oldPrice: 120000, discount: 10, popular: true, image: "/images/special-platter.png", description: "Two soft, chewy cookies with toasted milk, pistachio kunafa crunch, and a delicate cocoa finish." },
  { id: "Mix Platter", name: "Mix Platter", category: "Dimsum Mentai", weight: "2 pcs · 110g", price: 78000, oldPrice: 120000, discount: 10, popular: false, image: "/images/mix-platter.png", description: "Two soft, chewy cookies with toasted milk, pistachio kunafa crunch, and a delicate cocoa finish." },
  { id: "Dimsum Tart", name: "Dimsum Tart", category: "Dimsum Mentai", weight: "2 pcs · 110g", price: 108000, oldPrice: 120000, discount: 10, popular: false, image: "/images/dimsum-tart.png", description: "Two soft, chewy cookies with toasted milk, pistachio kunafa crunch, and a delicate cocoa finish." },
  { id: "Dubai Chewy Cookie", name: "Dubai Chewy Cookie", category: "Dubai Chewy", weight: "2 pcs · 110g", price: 35000, oldPrice: 120000, discount: 10, popular: true, image: "/images/dubai-chewy-cookie.png", description: "Two soft, chewy cookies with toasted milk, pistachio kunafa crunch, and a delicate cocoa finish." },
  { id: "Ube Chewy Cookie", name: "Ube Chewy Cookie", category: "Dubai Chewy", weight: "55g", price: 35000, oldPrice: 60000, discount: 8, popular: true, image: "/images/ube-chewy-cookie.png", description: "A soft, chewy cookie with a toasty milk center, pistachio kunafa crunch, and a delicate cocoa finish." },
  // { id: "dubai-bundle-2", name: "Bundle 2 pcs - Dubai Chewy Cookie", category: "Dubai Chewy", weight: "2 pcs · 110g", price: 108000, oldPrice: 120000, discount: 10, popular: true, image: "", description: "Two rich, indulgent chewy cookies with roasted pistachio and crispy kataifi." },
  { id: "pistachio-brownie", name: "Pistachio Kunafa Brownies", category: "Brownies", weight: "10 × 10cm", price: 110000, oldPrice: 125000, discount: 12, popular: true, image: "", description: "Fudgy chocolate brownies topped with pistachio cream and crisp kunafa." },
  // { id: "fudgy-brownies", name: "Fudgy Brownies", category: "Brownies", weight: "10 × 10cm", price: 65000, oldPrice: 69000, discount: 5, popular: true, image: "", description: "Deep chocolate brownies with a shiny top and a rich, fudgy center." },
  // { id: "brownie-cup", name: "Pistachio Brownies in Cup", category: "Brownies", weight: "1 cup", price: 115000, oldPrice: 130000, discount: 11, popular: false, image: "", description: "A spoonable brownie treat layered with chocolate and pistachio." },
  // { id: "choco-cashew", name: "Milk Choco Cashew Cookies", category: "Cookies", weight: "80g", price: 25000, oldPrice: 27000, discount: 7, popular: true, image: "", description: "Buttery cookies with creamy milk chocolate and roasted cashews." },
  // { id: "smores", name: "S’mores Cookies", category: "Cookies", weight: "80g", price: 24000, oldPrice: 27000, discount: 11, popular: false, image: "", description: "Chocolate cookies with toasted marshmallow and a little crunch." },
];
const categories = ["Dimsum Mentai","Dubai Chewy", "Brownies", "Cookies"];
const filterCategories = ["Cookies", "Brownies", "Gosend Only", "Bundle", "Dubai Chewy", "Dimsum Mentai"];
const money = (value) => `Rp ${new Intl.NumberFormat("en-US").format(value)}`;
const imageUrl = (id) => !id ? "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1100&q=88" : id.startsWith("/") || id.startsWith("https://") ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=88`;

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="7.1"/><path d="m16 16 5 5"/></svg>; }
function BagIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>; }
function UserIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4"/><path d="M4.5 21c.4-4.2 3.3-6.5 7.5-6.5s7.1 2.3 7.5 6.5"/></svg>; }

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Dubai Chewy");
  const [allProducts, setAllProducts] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [productType, setProductType] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [openFilters, setOpenFilters] = useState({ categories: true, type: true, availability: true, price: true });
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState(["dubai"]);
  const [recentlyViewed, setRecentlyViewed] = useState([products[1]]);
  const [favorites, setFavorites] = useState([]);
  const [bag, setBag] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toast, setToast] = useState("");
  const count = bag.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = bag.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shownProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((category) => {
        if (category === "Bundle") return product.id.toLowerCase().includes("bundle") || /bundle|platter/i.test(product.name);
        if (category === "Gosend Only") return product.category === "Dimsum Mentai";
        return product.category === category;
      });
      const searchMatch = product.name.toLowerCase().includes(catalogSearch.trim().toLowerCase());
      const typeMatch = productType === "all" || product.popular;
      const stockMatch = availability === "all" || (availability === "in" ? product.inStock !== false : product.inStock === false);
      const low = priceFrom === "" ? 0 : Number(priceFrom);
      const high = priceTo === "" ? Infinity : Number(priceTo);
      const priceMatch = product.price >= low && product.price <= high;
      return categoryMatch && searchMatch && typeMatch && stockMatch && priceMatch;
    });
    return filtered.sort((a, b) => {
      if (sortOrder === "featured" || sortOrder === "best-selling") return Number(b.popular) - Number(a.popular);
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      if (sortOrder === "name-asc") return a.name.localeCompare(b.name, "id");
      if (sortOrder === "name-desc") return b.name.localeCompare(a.name, "id");
      return products.indexOf(b) - products.indexOf(a);
    });
  }, [availability, catalogSearch, priceFrom, priceTo, productType, selectedCategories, sortOrder]);
  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    return products.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query));
  }, [search]);
  const toggleFilterCategory = (category) => setSelectedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  const toggleFilterSection = (section) => setOpenFilters((current) => ({ ...current, [section]: !current[section] }));
  const clearFilters = () => { setSelectedCategories([]); setProductType("all"); setAvailability("all"); setPriceFrom(""); setPriceTo(""); setCatalogSearch(""); setSortOrder("featured"); };
  const runSearch = (query) => {
    const term = query.trim();
    if (!term) { notify("Masukkan nama produk yang ingin dicari."); return; }
    setSearch(term);
    setRecentSearches((current) => [term, ...current.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 6));
    setSearchOpen(true);
  };
  const removeRecentSearch = (term) => setRecentSearches((current) => current.filter((item) => item !== term));
  const notify = (message) => { setToast(message); window.clearTimeout(window.toastTimer); window.toastTimer = window.setTimeout(() => setToast(""), 2400); };
  const addToBag = (product, quantity = 1) => {
    setBag((current) => {
      const found = current.find((item) => item.id === product.id);
      return found ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + quantity } : item) : [...current, { ...product, qty: quantity }];
    });
    setSelected(null);
    notify(`${product.name} ditambahkan ke keranjang`);
  };
  const toggleFavorite = (product) => {
    const exists = favorites.includes(product.id);
    setFavorites((current) => exists ? current.filter((id) => id !== product.id) : [...current, product.id]);
    notify(exists ? "Dihapus dari favorit" : "Ditambahkan ke favorit ♡");
  };
  const openProduct = (product) => { setSelectedQty(1); setSelected(product); setRecentlyViewed((current) => [product, ...current.filter((item) => item.id !== product.id)].slice(0, 5)); };
  const setQuantity = (id, delta) => setBag((current) => current.map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const renderProducts = (items, gridId) => items.length ? <div className="product-grid" id={gridId}>{items.map((product) => <article className="product-card" key={product.id}>
    <div className="product-art" role="button" tabIndex={0} aria-label={`Lihat ${product.name}`} onClick={() => openProduct(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openProduct(product); }}>
      <Image src={imageUrl(product.image)} alt={product.name} fill sizes="(max-width: 767px) 50vw, 33vw"/>
      {product.popular && <span className="popular-tag">BEST SELLER</span>}
      {product.discount > 0 && <span className="discount-tag">{product.discount}%</span>}
      <button className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`} aria-label={favorites.includes(product.id) ? "Hapus dari favorit" : "Tambah ke favorit"} onClick={(event) => { event.stopPropagation(); toggleFavorite(product); }}>{favorites.includes(product.id) ? "♥" : "♡"}</button>
    </div>
    <button className="product-name" onClick={() => openProduct(product)}>{product.name}</button>
    <div className="product-price"><span className="old-price">{money(product.oldPrice)}</span><strong>{money(product.price)}</strong></div><button className="buy-card" onClick={() => openProduct(product)}>Beli</button>
  </article>)}</div> : <div className="no-results">Produk tidak ditemukan.</div>;

  return <main className="storefront">
    <header className="store-header">
      <div className="header-main">
        <div className="header-tools-left"><button className={`store-icon search-button ${searchOpen ? "is-active" : ""}`} aria-label="Cari produk" onClick={() => { setSearchOpen(!searchOpen); setSearch(""); }}><SearchIcon/></button><a className="brand-logo" href="#home" aria-label="Delicea Kitchen home"><span>delicea</span><i>KITCHEN</i></a></div>
        <div className="header-tools-right"><button className="store-icon" aria-label={`Keranjang, ${count} produk`} onClick={() => setCartOpen(true)}><BagIcon/>{count > 0 && <b className="count-badge">{count}</b>}</button><button className="store-icon" aria-label="Akun" onClick={() => setAccountOpen(true)}><UserIcon/></button></div>
      </div>
      <nav className="store-nav"><a className={!allProducts && activeCategory === "Dubai Chewy" ? "selected" : ""} href="#home" onClick={(event) => { event.preventDefault(); setAllProducts(false); setActiveCategory("Dubai Chewy"); }}>Home</a><a className={allProducts ? "selected" : ""} href="#products" onClick={(event) => { event.preventDefault(); setAllProducts(true); }}>All products</a></nav>
    </header>

    {searchOpen && <div className="search-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}><div className="search-dialog"><div className="search-top"><form className="search-form" onSubmit={(event) => { event.preventDefault(); runSearch(search); }}><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari Produk Kami" aria-label="Cari Produk Kami"/><button type="submit" aria-label="Cari"><SearchIcon/></button></form><button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Tutup pencarian">×</button></div><div className={`search-content ${search.trim() ? "has-search-results" : ""}`}>{search.trim() ? <div className="search-results"><div className="search-results-heading"><h2>Produk</h2><span>{searchResults.length} Hasil Ditemukan</span></div>{searchResults.length ? <div className="search-result-list">{searchResults.map((product) => <button className="search-result" key={product.id} onClick={() => { setSearchOpen(false); openProduct(product); }}><span className="search-result-image"><Image src={imageUrl(product.image)} alt="" fill sizes="92px"/></span><span className="search-result-info"><strong>{product.name}</strong><span>{money(product.price)}</span></span></button>)}</div> : <p className="search-empty">Produk tidak ditemukan.</p>}</div> : <>{recentSearches.length > 0 && <div className="search-block"><div className="search-section-heading"><h2>Pencarian Terbaru</h2><button onClick={() => setRecentSearches([])}>Hapus semua</button></div><div className="query-list">{recentSearches.map((term) => <button className="popular-query" key={term} onClick={() => runSearch(term)}><span>{term}</span><span className="remove-query" aria-label={`Hapus pencarian ${term}`} onClick={(event) => { event.stopPropagation(); removeRecentSearch(term); }}>×</span></button>)}</div></div>}<div className={`search-block ${recentSearches.length ? "popular-block" : ""}`}><h2>Pencarian Populer</h2><button className="popular-query" onClick={() => runSearch("brown")}>brown</button></div><div className="search-block recently-block"><h2>Baru Dilihat</h2><div className="recent-grid">{recentlyViewed.map((product) => <article className="recent-card" key={product.id}><button className="recent-image" onClick={() => { setSearchOpen(false); openProduct(product); }}><Image src={imageUrl(product.image)} alt={product.name} fill sizes="200px"/><span className="recent-add" onClick={(event) => { event.stopPropagation(); addToBag(product); }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3M19 3v6m-3-3h6"/></svg></span></button><button className="recent-name" onClick={() => { setSearchOpen(false); openProduct(product); }}>{product.name}</button><del>{money(product.oldPrice)}</del><strong>{money(product.price)}</strong></article>)}</div></div></>}</div></div></div>}

    <section className="catalog" id="home">
      {allProducts ? <div className="all-products-layout">
        <aside className="filter-sidebar" aria-label="Filter produk">
          <div className="filter-search"><SearchIcon/><input aria-label="Cari produk" placeholder="Cari" value={catalogSearch} onChange={(event) => setCatalogSearch(event.target.value)}/>{catalogSearch && <button onClick={() => setCatalogSearch("")} aria-label="Hapus pencarian">×</button>}</div>
          <section className="filter-section"><button className="filter-heading" onClick={() => toggleFilterSection("categories")} aria-expanded={openFilters.categories}><span>Kategori</span><span>{openFilters.categories ? "⌃" : "⌄"}</span></button>{openFilters.categories && <div className="filter-options">{filterCategories.slice(0, showMoreCategories ? filterCategories.length : 5).map((category) => <label className="filter-option" key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleFilterCategory(category)}/><span>{category}</span></label>)}<button className="show-more" onClick={() => setShowMoreCategories(!showMoreCategories)}>{showMoreCategories ? "Lihat lebih sedikit" : "Lihat lainnya"}<span>{showMoreCategories ? "⌃" : "⌄"}</span></button></div>}</section>
          <section className="filter-section"><button className="filter-heading" onClick={() => toggleFilterSection("type")} aria-expanded={openFilters.type}><span>Tipe Produk</span><span>{openFilters.type ? "⌃" : "⌄"}</span></button>{openFilters.type && <div className="filter-options"><label className="filter-option"><input type="radio" name="productType" checked={productType === "all"} onChange={() => setProductType("all")}/><span>Semua Produk</span></label><label className="filter-option"><input type="radio" name="productType" checked={productType === "featured"} onChange={() => setProductType("featured")}/><span>Produk Unggulan</span></label></div>}</section>
          <section className="filter-section"><button className="filter-heading" onClick={() => toggleFilterSection("availability")} aria-expanded={openFilters.availability}><span>Ketersediaan</span><span>{openFilters.availability ? "⌃" : "⌄"}</span></button>{openFilters.availability && <div className="filter-options"><select className="filter-select" value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="all">Semua</option><option value="in">Ada Stok</option><option value="out">Stok Habis</option></select></div>}</section>
          <section className="filter-section"><button className="filter-heading" onClick={() => toggleFilterSection("price")} aria-expanded={openFilters.price}><span>Harga</span><span>{openFilters.price ? "⌃" : "⌄"}</span></button>{openFilters.price && <div className="price-filters"><label><span>Minimum</span><input type="number" min="0" placeholder="Rp 0" value={priceFrom} onChange={(event) => setPriceFrom(event.target.value)}/></label><label><span>Maksimum</span><input type="number" min="0" placeholder="Tanpa batas" value={priceTo} onChange={(event) => setPriceTo(event.target.value)}/></label></div>}</section>
          <button className="clear-filters" onClick={clearFilters}>Hapus semua filter</button>
        </aside>
        <div className="all-products-main"><div className="all-products-heading"><div><h1>Semua Produk</h1><span>{shownProducts.length} produk</span></div><label className="sort-control"><strong>Urutan :</strong><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}><option value="featured">Unggulan</option><option value="best-selling">Terlaris</option><option value="price-asc">Harga, rendah ke tinggi</option><option value="price-desc">Harga, tinggi ke rendah</option><option value="name-asc">Nama A-Z</option><option value="name-desc">Nama Z-A</option><option value="newest">Terbaru</option></select></label></div>{renderProducts(shownProducts, "products")}</div>
      </div> : categories.map((category) => <section className="home-category" key={category} id={category.toLowerCase().replaceAll(" ", "-")}><h1 className="category-title">{category}</h1>{renderProducts(products.filter((product) => product.category === category), `${category}-products`)}</section>)}
    </section>

    {cartOpen && <><button className="backdrop" aria-label="Tutup keranjang" onClick={() => setCartOpen(false)}/><aside className="side-panel" aria-label="Keranjang belanja"><div className="panel-heading"><h2>Keranjang belanja <small>({count})</small></h2><button onClick={() => setCartOpen(false)} aria-label="Tutup">×</button></div>{bag.length ? <div className="bag-lines">{bag.map((item) => <div className="bag-line" key={item.id}><Image src={imageUrl(item.image)} alt="" width={82} height={82}/><div className="bag-line-info"><strong>{item.name}</strong><span>{money(item.price)}</span><div className="quantity"><button onClick={() => setQuantity(item.id, -1)}>−</button><span>{item.qty}</span><button onClick={() => setQuantity(item.id, 1)}>+</button></div></div><button className="remove-item" onClick={() => setBag((current) => current.filter((entry) => entry.id !== item.id))}>Hapus</button></div>)}</div> : <div className="empty-state">Keranjang Anda masih kosong.</div>}<div className="panel-bottom"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><button onClick={() => notify(bag.length ? "Hubungi Delicea Kitchen untuk menyelesaikan pesanan." : "Keranjang Anda masih kosong.")}>Lanjutkan ke checkout</button><small>Ongkos kirim dihitung saat checkout.</small></div></aside></>}

    {selected && <><button className="backdrop" aria-label="Tutup detail produk" onClick={() => setSelected(null)}/><section className="product-modal" role="dialog" aria-modal="true" aria-label={selected.name}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Tutup">×</button><div className="modal-photo"><Image src={imageUrl(selected.image)} alt={selected.name} fill sizes="(max-width: 700px) 90vw, 45vw"/></div><div className="modal-detail"><span className="modal-category">{selected.category}</span><h2>{selected.name}</h2><div className="modal-prices"><del>{money(selected.oldPrice)}</del><strong>{money(selected.price)}</strong></div><p>{selected.description}</p><p className="weight-line">Berat: {selected.weight}</p><p className="shipping-note">Pengiriman khusus area yang tersedia. Hubungi kami untuk konfirmasi cakupan pengiriman.</p><div className="modal-quantity"><span>Jumlah</span><div className="quantity"><button onClick={() => setSelectedQty((qty) => Math.max(1, qty - 1))}>−</button><span>{selectedQty}</span><button onClick={() => setSelectedQty((qty) => qty + 1)}>+</button></div></div><div className="modal-actions"><button onClick={() => addToBag(selected, selectedQty)}>Tambah ke keranjang</button><button className="buy-now" onClick={() => { addToBag(selected, selectedQty); setCartOpen(true); }}>Beli sekarang</button></div></div></section></>}

    {accountOpen && <><button className="backdrop" aria-label="Tutup akun" onClick={() => setAccountOpen(false)}/><section className="account-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={() => setAccountOpen(false)} aria-label="Tutup">×</button><h2>Masuk ke akun</h2><p>Lihat pesanan dan simpan produk favorit Anda.</p><form onSubmit={(event) => { event.preventDefault(); setAccountOpen(false); notify("Kami akan menghubungi Anda untuk masuk."); }}><label htmlFor="accountEmail">Email</label><input id="accountEmail" type="email" placeholder="nama@email.com" required/><button type="submit">Lanjutkan</button></form></section></>}
    <div className={`toast ${toast ? "visible" : ""}`} role="status">{toast}</div>
  </main>;
}
