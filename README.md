# 🇦🇴 AngolaVibes

> Descobre os melhores restaurantes, shoppings e spots de lazer em Luanda — tudo num só lugar.

https://github.com/user-attachments/assets/83bca7e9-32e1-436c-9b42-203af5e6581b

Live demo: https://angolavibes.vercel.app

## 💡 O Problema

Em Luanda, encontrar um bom lugar para sair muitas vezes envolve perguntar a amigos ou saltar entre várias apps. O **AngolaVibes** reúne tudo numa única plataforma com mapa, fotos e informações actualizadas.

## 🚀 Funcionalidades

- 🔍 **Busca inteligente** — encontra lugares por nome, categoria ou proximidade
- 🖼️ **Galeria de fotos** — carousel com imagens reais de cada local
- 🗺️ **Mapa interativo** — integração com Google Maps para localização exacta
- ⚡ **Cache inteligente** — resultados da Google Places API guardados no backend para performance e economia de quota

## 🛠️ Tech Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | React + TypeScript + Bootstrap |
| Backend | Node.js + Express |
| Base de dados | MySQL |
| APIs | Google Places API + Google Maps API |


## ⚙️ Setup Local

```bash
# Clone o repositório
git clone https://github.com/m3rcio/angolavibes.git

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd ../frontend
npm install
npm start














