import { http, HttpResponse } from "msw";


  const products = [
  // ---------- ELECTRONICS ----------
  {
    id: 1,
    name: "Sony WH-1000XM5 Noise-Canceling Headphones",
    price: 8999,
    category: "Electronics",
    inStock: true,
    image: "https://www.google.com/imgres?q=sony%20headphones&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F61oqO1AMbdL.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FSony-WH-1000XM4-Cancelling-Headphones-Bluetooth%2Fdp%2FB0863TXGM3&docid=TxK6GFU7_yReFM&tbnid=PW9zVXnvEuIkNM&vet=12ahUKEwiYk8Sssf6QAxWrcGwGHdTuJQ4QM3oECBQQAA..i&w=2206&h=2560&hcb=2&ved=2ahUKEwiYk8Sssf6QAxWrcGwGHdTuJQ4QM3oECBQQAA"
  },
  {
    id: 2,
    name: "Bose QuietComfort Ultra Headphones",
    price: 9499,
    category: "Electronics",
    inStock: true,
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITERERExMVFhASFxIWEhcXFxAVFRUTFhUWFhYWExUYHSggGBolGxgWITEiJSkrMS4uFyAzODMtNygtLisBCgoKDg0OGxAQGi0lICUtLS0tLS0tLS0rLS0tLS4tLSstLS0tLS0tLS03LS0tLSsrLS0tLS0tLS0tLS0tLS0tL//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwMEBQYIAgH/xABHEAABAwIDBAYFCQYDCQEAAAABAAIDBBEFIUEGEjFRBxMiYXGRMoGCobEUI0JSYnKSwfAkg6Ky0eEzY8IVFzRDU3N0s9II/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAIDBAH/xAAgEQEAAgIDAQEBAQEAAAAAAAAAAQIDERIhMUFRQhMy/9oADAMBAAIRAxEAPwCcUREBERAREQEREBERARfCbZngOK0babbxrbx0tnP1lObG97B9M8jw8Re0q1m3iNrRX1uNdiEMLd6WRkbeb3NbfwvxWCm28w9v/OLvuxzuHmG2UR1tWXvMkji+Q8XON3erkO4Kxkq281fGCPqic0/E1wbe4e426/dP2452D8Tmge9Zyir4Zm70UrJG82Oa8eYK51+VtOq+xS2cHscWvHBzS5rx4ObYhJwR8IzT9h0kih7Aekaphs2f9oi5mzZgO5w7L/BwB+0pNwHaCnq2b0EgJHpMPZkZ95hzHjwOhKptjtX1dXJFvGUREUExERAREQEREBERAREQEREBERAREQEREBERAREQFQrqyOGN0srgyNou5x4f3OgA4r1VVLI2Pke4NYwFzieAAzKhzaPH5K2XeN2wMJ6mPlpvv5vI8r2GpM6U5She/GF9tNtVJVksbeOlH0fpSW1ktp9nzvpp+I1Ybe/0ePj+svUsqMh6/h2vyUcbRYiS9zAdTda4iIhlndpVMQxwkkDgsY+vcdVbRQPfcta51uO6CbeNlTc2xtqnKU4pC+ZXuGqvKfFCNVhCEBXORwhuNNiQKyNJWuY9skT3Mkbm1zTZw9fLu4HVaHFOQspR4gdSpxMShNZh0FsR0gtqC2nqt1lQbBj+DJToPsP7uB042W+rlqCcOClDYHb8t3aasfdmQimcc28mzE6cnn181nyYvtV2PL8lKqIizrxERAREQEREBERAREQEREBERAREQEREBERBoHSrihDYaUH/ABPnJO9rTZgPcXXPsBaBEVlOkat38RmGkYjYPDcDz73uWCjlWzHGqwx5J3aV7UvswnkH/C35rYOh3YumfTnEJ42TTTSSdVvtDmxMjkdH2WnLeLmk73K1rZ31Oqk7Dvuv/wBKlroqbbCKK31Xn1mV5PvKhmnVU8Pra2NAFgAAOAGQVvWUEMoLZYo5GniHsY8HxDgrlFmaWgbRdEWG1AJjYaaXR0OTL98R7NvDdPeob2x6Ma6g3pC3rqYXPWxAndHOVnFnjmO9dRopxkmEZrEuJt1e2usuiOkDokgqg6ek3YKrMltrQynvA/w3faGXMG9xAWJ4bLTyvgmjdHNGbOa4WI5EaEHQjI6K+tonxXaNeq9DVEarPQTgharGslSSkK6GeYTJ0Z7cFjmUNS75t1m08hPongInH6p4NOnDha0tLlVjg4WU19F22BqY/kk7r1MTew48ZYhlcnV7cgeeR52z5cf9QvxZP5lv6IizrxERAREQEREBERAREQEREBERAREQEREHPm1k+9X1h/zpW/hcW/krCNyr7Sf8bWf+RUf+1yso3LfHjDPq7ebtI5hw/hJ/JS70SS72EUn2evafZnkb+Shx8oaBfUgedx/VSh0HVe/h0jP+jUTNHg4Ml+MhVOb/AJW4fUhoiLM0iIiAtW282Ip8Si3X9ioYD1MwF3MPHdcPpMJ4t8rHNbSiROhyDjuBz0VQ+mqGbsjcxq17dHxu+k08/EGxBCowldR7bbIwYjTmGUbsjbmGUC7on8xzacrt17iARzRi2FTUc8lNO3dljOerXNPovYdWkZg+diCFsx5OTNkprtUp32WUoaySKSOeJ27LE4OYe8aHmCLgjUEhYSJ6voZFYpdMbMY4yspo6hmW8LPbxLJBk9h8DrqLHVZVQd0TbQfJ6v5O8/M1dmjk2cDsH2h2O87inFYsleM6bKW5RsREUExERAREQEREBERAREQEREBERAREQc97bRbuI1jf81zvxgP/ANSxLFIfSvsxL1pr4mOfG5rROGAue1zRuh+6M3N3d0Gwy3bnLMQ7WY6X9inBuci85W+6PzK2VvHGGSaTyl42jxb5xsbDfcuXfeItb1D4qaf/AM8RO/2dPIQbSVL93vDYomkj13HqUe4RgzJMErow0GoicJ963adu8Rfja11P2yeGQU1FTQU+cDY2ljsrv3hvF7rauJLj4qjLM/V2PXxl0RFUtEREBERAWjdKuxYr6brIm/ttOHGE5AyN4uhce/S/A8gSt5RdidTuHJjbj+A8wQRxByIPIjRZGArcOmPZoU1aKmMWhrN5xA4NnbbrPDeuH95L1pkJW2ttxtjtXU6XrwbXaSHCxaRxa4G4IPMGxXRWxmOitooKjIPcN2UD6MrOy8eFwSO4hc6xuW/dC+M9VVTUTj2KgdbF/wB6MWeBzLowD+6Veau67Tw21OkzoiLK1CIiAiIgIiICIiAiIgIiICIiAiIgKDOm3DRFXw1AADamGxsOMkTjvEnmWvZ+FTmtA6bcL63DTMB26WRkviw/NyDw3X73sBTpOrI3jdUb9H1YG1Bid6E7XMcO5wI/opI2U2spqTD2xVczY30b5KXdNy9wit1W4wdp3zTouHuUH4XId5rrkFpBFiQfMcPUt6x7ZhtW2OupWs63dDZY8mh1tWkDsu+KvtWLes9LcWy1/S4y5EEOWjpCSfwM/wDpY7/epUHWEfuprfzLQ5aaZpsaZ4I5lnusqD5LenG9vquPcuxjr+OTe36lCi6T5z6UcEg5ML2O95d8FseGdItJIQ2UPhd9obzL/ebmPEgKChGx+bSD8R6uIXtlTIzXebydn5Hik4qyRltDp+nqGSND2Oa9juDmkOaR3EZFVFzvs/tHLA/fp5Cx3FzDm133m8HeORHcpc2R23hq7RPAiqfqE9l9uJidr905jvAuqL4pqupli3TbERFWtan0oYH8rw2drReWEdfFqd+O5IHe5m+32lzrA64BXWy5e2twf5HX1NNazGvLouXVP7bAPAHd8WlaMNvijNH1QgKuIa51NNDVM9KnkZJYcXNae232m7zfaVnA5V6p43Tfkr/VETqduoYJmva17TdrwHNOhaRcEepVFp3RFXmbCKMnjG18XsxPdGz+FrVuKwS3CIiAiIgIiICIiAiIgIiICIiAiIgLEbXsjNBWiW3VGnn376N6t1ysuom6ftozFBFRMNjPd8tuPVtNmt8C659hSrG5ctOoQ5htR2QTyF1s+z+2Dae7XP7B5BzvgFrGE4YHtD5S4R/Ra2287vucmjv4n3rORmnaLNporfbvIfNy1xuWSdRLOjaimlfcyAfeDm/zBbBSxwytu0tc06ggjzC0brqc+lSxeyAw+5IsNgLt6nmfTy6Ak2Pde9/f6k7c6bDjGybHdpnZdoRktSqutgduzN3m/WHH1rYINpqmmIZWM3o+AmYP5gMj7j3FZasZDUR77C17HcCP1ke5IkmGklgcA5puNCP1kq0NWbgONnAgtcCQbjMG44G+qtK+jfTvLmZsPFui9NkbI3eb6xqFJzSZuj7b3rS2kqnDr+EUhyEvJj+UnI/S8eMirlKOa3Zd7J+AupJw7pUmbSCFzN+tb2WyutuGO2T3jiZNLcDxvoqL4u91X0y9aslPGsdp6Vu9PK1l/RGZe77rBmfJQh0i4jDiFTHPE18e5H1bi/du8Bxcw7oOVt5+udxwssFiWKOe90sshfK70nONybadw5AZBUYKsO4FTpjivau+WbPDqMtGRv7lha2KplsxkbiXPbG0N7RL3eiABqVtMZurSRzopGTRndlic18buNnNIcLjUXAy1U7RMx0jWdT26C2BwA0OH01K7N8bLyWzHWPcXvAOoDnEDuAWwLWdg9ro8Qg3rBtRHuieP6riMnN5sdY28COIWzLFManUtkTsREXHRERAREQEREBERAREQEREBERAXOHSxL1+NTtdnHTtibbn2A7d/EXFdHrm3pBbbFcR5mVnl1ERHxVuKN2V5Z1DCPlXnrFScV5utTKr9YvQercFew5BlaPEy0bjxvxHItOeXdf4LxLTPp71FG4uhOckWZtzy45eY7xkseHK6oa10brjgfSGhH9VyYIl4xDaKKVlxkTxB4g/n4rA4fVHfcW8Ba/Ig8QtgxjZyKYddF2S7M24E63GhWPocI6oG+ZKjHLfac8dK0wDhcaqgJT7TdV7b2TbQ/FUJ8jdTQYrEa1xcQeKYTWFsjRo4211X3Fo+Dh+grbC496aMfaB8s/yWa02i7REVmiQaXgqVWOKuKZuStqp3FaWZ62V2gdQVkNSL9WLsqGj6UDiA7LUtJDx3stqV0tSVLJY2SxuDo5GtcxwzDmuFwQeRC5QqBckdx+IUt9Ae0BdFNh7znATLBfiYXu7bR3NeQf3gVGav1ow2+JaREWdeIiICIiAiIgIiICIiAiIgIiICgTpooerxLrLdmoijffm9nzbh6mtj81PajPp1wnfo4aoDtU0lnd0U1mn+MR+ZVmKdWV5I3VCl0XxpXpa2UX1fCqkbAc75Jt3Ty1egV8eRfLggRyWQw2s3Tun0Xe46FVqtwWJKqSz3AOoRxSqirWR1wvs0iolyOwoVAu0hV9laMl7nkZNFh4nj7viqEpWz4NAGsaBqL+JOahxiZ2ny1XTI8GrF1civKyfRYWpn4n9FTVvjRfePgPIf39y2ToWqHDGmtaCQ5sofa9hH1RJv7bYlrzW7rQ08bEnx1991tPRCy2LU5HFwmDu8dTIc/WAoXjdVlJ1Z0SiIsbWIiICIiAiIgIiICIiAiIgIiICtcUoGTwywSC8crHMeNd1wsbHQ96ukQcoYxhklJUS0sv+JE4tvawe3i17e5zbH120VuSp36WNiTWwiogb+2wDIazRZkx/eBuW95I+lcQJG/Q5EZEHIgjiCNCtlL8oZL04ypCJzsyf1noq7G2Fl9X0KekdvoX1fF8JRx7JVtPJZVrrH4g/h4oRD4+VfLq1DlcxDI+C5E7dmNPD+Hktgw+tG4BrYDyWCdkL8s/JeMPmOqb7d11tnamoVpDm6+jfe7+3HyVCSQ8B6R93eqjHAAAafq5XXPF28+/j4BSH0J0BfWvmt2YYnfikIa3+EP8AJRvAb3uugeiPBjBQiVwtJVHrO8RWtEPWLu9tV5Z1VLHG7N3REWRrEREBERAREQEREBERAREQEREBERAUYdJvRr8oLqyjaBVcZYsg2f7TdGye52tjmpPRdraazuHJiJ6lyKSWlzHgte0kOa4FrmuHEOacwe4r0F0fthsHR4gN6RpZUAWbNHYSWHAPuLPb3EZaEKIcf6LMRpiXRNFTEOBiykt9qFxvfuaXLVXLEs9scx408ryV9qWSRHdljfG7lI17D5OAVLrAc1YqHvWNq3Xd4K8e6/BeOoSe3Y6WTGq9jbkvUVNfw1OiqSkAWb5/0C5HTsztj6t/0fNeYMlWFOT/AF/uvsYGdje2RUddpb6emG3jqvRcvPV2ztYnisjs7gVRXTtp6dm885uJuGRsvm+R2jR5ngLlS3qO0dbnpn+jbZp1fVtYR+zxWfUH7F8meLyCPAOOi6Ya0AAAWAyAHADuWF2P2Zhw+mbTxZn0pXkWdJIRm93LkBoAAs2suS/KWmlOMCIirTEREBERAREQEREBERAREQEREBERAREQEREHwhYPGNjcPqiTPSROeeLw3ckP7xlne9Z1EidCP5uh/DD6ImZ3Nlcf5w5e4uiPDALFszjzMrr+HZsPct9RS52/UeFfxrU2wOGugFOaVnVtuWkbwkDja5Et9++Q1zsFpWKdCsdyaepIGjZmB/k9pFvwlS0iRe0fSaVlC0XQpM82mqYmsv8AQEryR4Hd/NesY6GZGW+STMc36so3HDwcwEHyHiVM6KX+tt7R/wA660hDCehWoe4Gqnjjj1EW9I8jlvOaGtPfZ3gpb2d2epqKIQ00YYzi45l73fWkec3Hx4cBYLKIuWvNvUq1ivgiIoJCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP/Z"
  },
  {
    id: 3,
    name: "Sennheiser Momentum 4 Wireless",
    price: 8799,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800"
  },
  {
    id: 4,
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
  },
  {
    id: 5,
    name: "Razer DeathAdder Essential Mouse",
    price: 899,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    price: 10999,
    category: "Electronics",
    inStock: false,
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800"
  },
  {
    id: 7,
    name: "Samsung Galaxy Watch 6",
    price: 9999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800"
  },
  {
    id: 8,
    name: "Garmin Venu 3 Smartwatch",
    price: 11999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800"
  },
  {
    id: 9,
    name: "MacBook Pro 14-inch M3",
    price: 159999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
  },
  {
    id: 10,
    name: "Dell XPS 13 Laptop",
    price: 124999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"
  },

  // ---------- HOME ----------
  {
    id: 11,
    name: "Herman Miller Aeron Chair",
    price: 12999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=800"
  },
  {
    id: 12,
    name: "Steelcase Leap Chair",
    price: 13999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=800"
  },
  {
    id: 13,
    name: "IKEA Markus Office Chair",
    price: 8999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=800"
  },
  {
    id: 14,
    name: "IKEA Tertial Work Lamp",
    price: 1599,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
  },
  {
    id: 15,
    name: "Philips Hue Go Table Lamp",
    price: 4599,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
  },
  {
    id: 16,
    name: "Hydro Flask Standard Mouth",
    price: 799,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1590141787878-5a59d5b58e09?w=800"
  },
  {
    id: 17,
    name: "Yeti Rambler Bottle",
    price: 1299,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1590141787878-5a59d5b58e09?w=800"
  },
  {
    id: 18,
    name: "Corkcicle Canteen Bottle",
    price: 999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1590141787878-5a59d5b58e09?w=800"
  },

  // ---------- CLOTHING ----------
  {
    id: 19,
    name: "Nike Dri-FIT Cotton T-Shirt",
    price: 499,
    category: "Clothing",
    inStock: false,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
  },
  {
    id: 20,
    name: "Adidas Essentials T-Shirt",
    price: 599,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
  },
  {
    id: 21,
    name: "Levi's Denim Jacket",
    price: 2499,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
  },
  {
    id: 22,
    name: "Wrangler Classic Denim Jacket",
    price: 1999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"
  },
  {
    id: 23,
    name: "Nike Air Max Running Shoes",
    price: 3499,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },
  {
    id: 24,
    name: "Adidas Ultraboost Shoes",
    price: 3999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },
  {
    id: 25,
    name: "Under Armour HOVR Shoes",
    price: 3299,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },

  // ---------- BOOKS ----------
  {
    id: 26,
    name: "O'Reilly Programming Book",
    price: 2199,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513791051424-9a5d51c08eaa?w=800"
  },
  {
    id: 27,
    name: "No Starch Press Coding Guide",
    price: 1899,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513791051424-9a5d51c08eaa?w=800"
  },
  {
    id: 28,
    name: "Atomic Habits Personal Growth",
    price: 899,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
  },
  {
    id: 29,
    name: "The 7 Habits Personal Guide",
    price: 799,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
  },

  // ---------- FITNESS ----------
  {
    id: 30,
    name: "Lululemon Yoga Mat Pro",
    price: 1499,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800"
  },
  {
    id: 31,
    name: "Manduka PRO Yoga Mat",
    price: 1999,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800"
  },
  {
    id: 32,
    name: "Bowflex Adjustable Dumbbells",
    price: 4999,
    category: "Fitness",
    inStock: false,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800"
  },
  {
    id: 33,
    name: "NordicTrack Adjustable Dumbbells",
    price: 4499,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800"
  },

  // ---------- BEAUTY ----------
  {
    id: 34,
    name: "La Roche-Posay Skin-Care Combo",
    price: 1299,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },
  {
    id: 35,
    name: "CeraVe Skincare Combo Pack",
    price: 999,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },
  {
    id: 36,
    name: "The Ordinary Skincare Set",
    price: 1599,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },

  // ---------- GADGETS ----------
  {
    id: 37,
    name: "JBL Flip Portable Speaker",
    price: 1999,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=800"
  },
  {
    id: 38,
    name: "Bose SoundLink Mini Speaker",
    price: 2499,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=800"
  },
  {
    id: 39,
    name: "Sony SRS-XB13 Speaker",
    price: 1799,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=800"
  },

  // ---------- ELECTRONICS (Continued) ----------
  {
    id: 40,
    name: "Apple AirPods Pro 2",
    price: 7999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800"
  },
  {
    id: 41,
    name: "Samsung Galaxy Buds Pro",
    price: 6999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800"
  },
  {
    id: 42,
    name: "iPad Air 5th Generation",
    price: 54999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"
  },
  {
    id: 43,
    name: "Samsung Galaxy Tab S9",
    price: 49999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"
  },
  {
    id: 44,
    name: "PlayStation 5 Console",
    price: 39999,
    category: "Electronics",
    inStock: false,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800"
  },
  {
    id: 45,
    name: "Xbox Series X Console",
    price: 37999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800"
  },
  {
    id: 46,
    name: "Nintendo Switch OLED",
    price: 29999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800"
  },
  {
    id: 47,
    name: "Canon EOS R6 Camera",
    price: 159999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"
  },
  {
    id: 48,
    name: "Sony A7 III Camera",
    price: 149999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"
  },
  {
    id: 49,
    name: "Nikon Z6 II Camera",
    price: 139999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"
  },
  {
    id: 50,
    name: "GoPro Hero 12 Camera",
    price: 34999,
    category: "Electronics",
    inStock: true,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800"
  },

  // ---------- HOME (Continued) ----------
  {
    id: 51,
    name: "Dyson V11 Cordless Vacuum",
    price: 29999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800"
  },
  {
    id: 52,
    name: "Shark Navigator Vacuum",
    price: 12999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800"
  },
  {
    id: 53,
    name: "Instant Pot Duo Plus",
    price: 7999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
  },
  {
    id: 54,
    name: "Ninja Foodi Pressure Cooker",
    price: 8999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
  },
  {
    id: 55,
    name: "KitchenAid Stand Mixer",
    price: 24999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
  },
  {
    id: 56,
    name: "Cuisinart Food Processor",
    price: 8999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
  },
  {
    id: 57,
    name: "All-Clad Stainless Cookware",
    price: 19999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
  },
  {
    id: 58,
    name: "Lodge Cast Iron Skillet",
    price: 2999,
    category: "Home",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
  },

  // ---------- CLOTHING (Continued) ----------
  {
    id: 59,
    name: "Patagonia Better Sweater",
    price: 3999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },
  {
    id: 60,
    name: "The North Face Jacket",
    price: 5999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },
  {
    id: 61,
    name: "Columbia Sportswear Jacket",
    price: 4499,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"
  },
  {
    id: 62,
    name: "Lululemon ABC Pants",
    price: 2999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
  },
  {
    id: 63,
    name: "Under Armour Sport Pants",
    price: 1999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
  },
  {
    id: 64,
    name: "Adidas Training Pants",
    price: 1799,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
  },
  {
    id: 65,
    name: "Ralph Lauren Polo Shirt",
    price: 2999,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"
  },
  {
    id: 66,
    name: "Tommy Hilfiger Polo",
    price: 2499,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"
  },
  {
    id: 67,
    name: "Lacoste Classic Polo",
    price: 3499,
    category: "Clothing",
    inStock: true,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"
  },

  // ---------- BOOKS (Continued) ----------
  {
    id: 68,
    name: "Clean Code by Robert Martin",
    price: 1599,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513791051424-9a5d51c08eaa?w=800"
  },
  {
    id: 69,
    name: "Design Patterns Book",
    price: 1899,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513791051424-9a5d51c08eaa?w=800"
  },
  {
    id: 70,
    name: "The Pragmatic Programmer",
    price: 1799,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1513791051424-9a5d51c08eaa?w=800"
  },
  {
    id: 71,
    name: "Deep Work by Cal Newport",
    price: 999,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
  },
  {
    id: 72,
    name: "The Power of Now Guide",
    price: 899,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
  },
  {
    id: 73,
    name: "Thinking, Fast and Slow",
    price: 1199,
    category: "Books",
    inStock: true,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
  },

  // ---------- FITNESS (Continued) ----------
  {
    id: 74,
    name: "Peloton Exercise Bike",
    price: 89999,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
  },
  {
    id: 75,
    name: "NordicTrack Treadmill",
    price: 69999,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
  },
  {
    id: 76,
    name: "Bowflex Home Gym",
    price: 49999,
    category: "Fitness",
    inStock: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
  },
  {
    id: 77,
    name: "TRX Suspension Trainer",
    price: 3999,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
  },
  {
    id: 78,
    name: "Rogue Fitness Kettlebell",
    price: 1999,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800"
  },
  {
    id: 79,
    name: "CAP Barbell Set",
    price: 8999,
    category: "Fitness",
    inStock: true,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800"
  },

  // ---------- BEAUTY (Continued) ----------
  {
    id: 80,
    name: "Kiehl's Skincare Set",
    price: 2999,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },
  {
    id: 81,
    name: "Neutrogena Hydro Boost",
    price: 899,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },
  {
    id: 82,
    name: "Olay Regenerist Cream",
    price: 1299,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },
  {
    id: 83,
    name: "Dove Body Wash Combo",
    price: 699,
    category: "Beauty",
    inStock: true,
    image: "https://images.unsplash.com/photo-1600185365926-3e1ae8460e2f?w=800"
  },

  // ---------- GADGETS (Continued) ----------
  {
    id: 84,
    name: "Anker PowerCore Power Bank",
    price: 1999,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1609592810793-abeb6c64b5c6?w=800"
  },
  {
    id: 85,
    name: "Belkin Wireless Charger",
    price: 1299,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1609592810793-abeb6c64b5c6?w=800"
  },
  {
    id: 86,
    name: "Samsung Wireless Charger",
    price: 1499,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1609592810793-abeb6c64b5c6?w=800"
  },
  {
    id: 87,
    name: "Fitbit Charge 6 Tracker",
    price: 8999,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800"
  },
  {
    id: 88,
    name: "Garmin Vivosmart Tracker",
    price: 7999,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800"
  },
  {
    id: 89,
    name: "Amazon Echo Dot",
    price: 2999,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800"
  },
  {
    id: 90,
    name: "Google Nest Mini",
    price: 2499,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800"
  },
  {
    id: 91,
    name: "Apple HomePod Mini",
    price: 4999,
    category: "Gadgets",
    inStock: true,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800"
  },

  // ---------- SPORTS ----------
  {
    id: 92,
    name: "Wilson Evolution Basketball",
    price: 1999,
    category: "Sports",
    inStock: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800"
  },
  {
    id: 93,
    name: "Spalding NBA Basketball",
    price: 1499,
    category: "Sports",
    inStock: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800"
  },
  {
    id: 94,
    name: "Adidas Tiro League Soccer Ball",
    price: 1299,
    category: "Sports",
    inStock: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800"
  },
  {
    id: 95,
    name: "Nike Premier League Ball",
    price: 1599,
    category: "Sports",
    inStock: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800"
  },

  // ---------- AUTOMOTIVE ----------
  {
    id: 96,
    name: "Michelin Pilot Sport Tires",
    price: 8999,
    category: "Automotive",
    inStock: true,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
  },
  {
    id: 97,
    name: "Goodyear Eagle Tires",
    price: 7999,
    category: "Automotive",
    inStock: true,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
  },
  {
    id: 98,
    name: "Bosch Wiper Blades",
    price: 1999,
    category: "Automotive",
    inStock: true,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
  },
  {
    id: 99,
    name: "Rain-X Wiper Blades",
    price: 1499,
    category: "Automotive",
    inStock: true,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
  },

  // ---------- TOYS ----------
  {
    id: 100,
    name: "LEGO Creator Expert Set",
    price: 5999,
    category: "Toys",
    inStock: true,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800"
  }
];


export const handlers = [
  http.get("/products", async ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 9);
    const query = url.searchParams.get("query") || "";
    const category = url.searchParams.get("category") || "";
    const sort = url.searchParams.get("sort") || "";

    let list = [...products];

    if (query) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);

    const start = (page - 1) * limit;
    const paginated = list.slice(start, start + limit);

    return HttpResponse.json({
      items: paginated,
      total: list.length,
      page,
      limit
    });
  }),
];
