# 🛒 E-commerce WHO - Prueba Técnica

## 📋 Descripción

Este proyecto es una **prueba técnica** desarrollada para **Welding Helmets Online (WHO)**, implementando una aplicación de e-commerce moderna y funcional. La aplicación permite a los usuarios explorar productos, gestionar un carrito de compras y crear nuevos productos con validaciones robustas.

## ✨ Características Principales

### 🏠 **Página Principal**
- Visualización de productos en grid responsivo
- Cards de productos con imágenes, precios y calificaciones
- Navegación fluida entre páginas
- Estados de carga y manejo de errores

### 🛍️ **Gestión de Carrito**
- Agregar productos al carrito
- Incrementar/decrementar cantidades
- Eliminar productos individuales
- Limpiar carrito completo
- Persistencia de datos en localStorage
- Vista detallada del carrito

### ➕ **Creación de Productos**
- Formulario completo con validaciones
- Validaciones en tiempo real usando Yup
- Campos: título, precio, descripción, categoría, imagen, rating
- Modal de confirmación con datos del producto creado
- Animaciones suaves con Framer Motion

### 📱 **Diseño Responsivo**
- Interfaz adaptativa para móviles, tablets y desktop
- Diseño moderno con Tailwind CSS
- Componentes reutilizables
- Experiencia de usuario optimizada

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework de CSS utility-first

### **Gestión de Estado**
- **Zustand** - Gestión de estado global del carrito
- **React Query (TanStack Query)** - Gestión de datos del servidor

### **Formularios y Validación**
- **Formik** - Gestión de formularios
- **Yup** - Validación de esquemas

### **UI/UX**
- **Flowbite React** - Componentes de UI
- **Framer Motion** - Animaciones
- **React Icons** - Iconografía

### **Utilidades**
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificaciones

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/psamirt/WHO-Challenge-Frontend-Paolo_Tello
cd WHO
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── cart/              # Página del carrito
│   ├── products/          # Páginas de productos
│   │   ├── [id]/         # Detalle de producto
│   │   └── create/       # Crear producto
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página principal
│   └── providers.tsx     # Proveedores de contexto
├── components/           # Componentes reutilizables
│   ├── CardProducts.tsx  # Card de producto
│   └── Navbar.tsx        # Barra de navegación
├── store/               # Gestión de estado
│   └── cartStore.tsx    # Store del carrito (Zustand)
├── types/               # Definiciones de tipos
│   └── products.ts      # Interfaces de productos
├── utils/               # Utilidades
│   └── productsApi.ts   # API de productos
└── hooks/               # Custom hooks
```

## 🎯 Funcionalidades Implementadas

### **Gestión de Productos**
- ✅ Listado de productos con paginación
- ✅ Detalle individual de productos
- ✅ Creación de nuevos productos
- ✅ Validaciones completas de formularios

### **Carrito de Compras**
- ✅ Agregar productos
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Persistencia de datos
- ✅ Vista detallada del carrito

### **Experiencia de Usuario**
- ✅ Diseño responsivo
- ✅ Estados de carga
- ✅ Manejo de errores
- ✅ Animaciones suaves
- ✅ Navegación intuitiva

## 🔧 Configuración

### **Variables de Entorno**
El proyecto está configurado para trabajar con la API de productos de ejemplo. No se requieren variables de entorno adicionales para el funcionamiento básico.

### **Personalización**
- Los estilos se pueden personalizar en `src/app/globals.css`
- Los componentes están en `src/components/`
- La lógica de negocio en `src/store/` y `src/utils/`

## 📱 Compatibilidad

- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)
- ✅ Móviles y tablets

## 🤝 Contribución

Este es un proyecto de prueba técnica para Welding Helmets Online. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de una prueba técnica para Welding Helmets Online.

## 👨‍💻 Autor

**Desarrollador** - Paolo Samir Tello Uypan
- **Email**: [p_samir@hotmail.com]
- **Celular**: [+51 982254431]
- **LinkedIn**: [https://www.linkedin.com/in/paolo-tello-7a1872285/]
- **Portafolio**: [https://portfolio-paolo-tello-seven.vercel.app/]

---

**Welding Helmets Online** - Prueba Técnica Frontend Developer
