# 🏠 GharGhar – Modern Real Estate Platform  

*A full-stack property marketplace connecting buyers and sellers with intuitive tools.*  

![Demo](https://github.com/Bee6k/gharghar/blob/main/frontend/static/img/demo.gif) *(Replace with actual GIF/screenshot)*  

---

## ✨ **Why GharGhar?**  

✅ **End-to-End Solution**: List, browse, and manage properties seamlessly  
✅ **User-Centric Design**: Dark mode, responsive layouts, and smooth animations  
✅ **Secure & Scalable**: Django auth, PostgreSQL, and modular architecture  

---

## 🚀 **Key Features**  

| **Buyers**                | **Sellers**                | **Admins**               |  
|---------------------------|----------------------------|--------------------------|  
| 🔍 Advanced search filters | �️ Listing CRUD operations  | ✅ Approve/reject listings |  
| ❤️ Save favorites          | 📩 Inquiry management       | 👥 User moderation        |  
| 📍 Map-based property view | 📊 Performance analytics    | 📈 Platform insights      |  

---

## 🛠️ **Tech Stack**  

| **Frontend**               | **Backend**            | **Database**     |  
|----------------------------|------------------------|------------------|  
| Bootstrap 5.3 (Dark Mode)  | Django 4.2+            | PostgreSQL 14+   |  
| FontAwesome Icons          | Django ORM             | Full-text search |  
| AOS Animations             | Django REST Framework  | JSON fields      |  

---

## 🏗️ **Project Structure**  

```plaintext
gharghar/  
├── frontend/              # Templates & static assets  
│   ├── static/            # CSS, JS, images  
│   └── templates/         # HTML with Bootstrap components  
├── backend/               # Django apps  
│   ├── properties/        # Listings, images, inquiries  
│   └── users/            # Authentication & profiles  
└── database/              # Schema and migrations


git clone https://github.com/Bee6k/gharghar.git
cd gharghar
python -m venv venv
source venv/bin/activate  # Linux/Mac | venv\Scripts\activate for Windows
pip install -r requirements.txt
