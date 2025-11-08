# Star Wars Digital Album – Frontend Challenge

## Descripción del Proyecto
Este proyecto es una **Single Page Application (SPA)** desarrollada con **React.js**, que permite a los usuarios coleccionar láminas digitales del universo Star Wars. Las láminas se obtienen desde el **API público SWAPI** ([https://swapi.dev](https://swapi.dev)), y se dividen en tres categorías: Películas, Personajes y Naves.

El proyecto tiene dos secciones principales:
- **Obtener Láminas:** Permite abrir sobres de láminas con configuraciones aleatorias y agregarlas al álbum del usuario.  
- **Mi Álbum:** Muestra todas las láminas obtenidas y permite ver información detallada de cada recurso.

---

## Características

- **Álbum Digital Automático:** Cada usuario obtiene un álbum vacío al ingresar al sitio.  
- **Láminas Especiales y Regulares:**  
  - Todas las 6 películas, los 20 primeros personajes y las 10 primeras naves son **especiales**.  
  - El resto son **regulares**.  
- **Sobres Aleatorios:**  
  - Cada sobre contiene 5 láminas en dos posibles configuraciones:  
    1. 1 película, 3 personajes y 1 nave  
    2. 3 personajes y 2 naves  
  - Solo se puede abrir un sobre a la vez; los demás quedan bloqueados 1 minuto con contador visible.  
- **Gestión de Láminas:**  
  - Si una lámina no está en el álbum, se puede **Agregar al álbum**.  
  - Si ya se posee, se puede **Descartar**.  
- **Visualización del Álbum:**  
  - Muestra todas las láminas obtenidas por sección.  
  - Posiciones vacías muestran solo el número correspondiente.  
  - Láminas obtenidas permiten ver información detallada del API.

---

## Tecnologías Utilizadas

- **Frontend:** React.js, React Router, Tailwind CSS  
- **API:** [SWAPI](https://swapi.dev)  
- **Estado:** Context API con useReducer para manejo de sobres, láminas y temporizador  
- **Versionamiento:** Git  

---

