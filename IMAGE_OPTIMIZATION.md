# Оптимізація зображень Lux Mikrocement

Вага у десяткових KB/MB. Після — сума всіх адаптивних версій, без дублювання dist/.

| Файл | Роздільність до | Формат до | KB до | Формат після | KB після | Економія |
|---|---|---|---:|---|---:|---:|
| public/logo.png | 1254×1254 | PNG | 402.2 | PNG | 68.7 | 82.9% |
| src/components/assets/images/gallery1.jpg | 5619×4511 | JPG | 1668.7 | WEBP | 333.8 | 80.0% |
| src/components/assets/images/gallery10.jpg | 7360×4912 | JPG | 2073.0 | WEBP | 214.5 | 89.7% |
| src/components/assets/images/gallery2.jpg | 7360×4912 | JPG | 2749.0 | WEBP | 807.7 | 70.6% |
| src/components/assets/images/gallery3.jpg | 7342×4900 | JPG | 2153.4 | WEBP | 301.6 | 86.0% |
| src/components/assets/images/gallery4.jpg | 7342×4900 | JPG | 2473.7 | WEBP | 383.2 | 84.5% |
| src/components/assets/images/gallery5.jpg | 7029×4691 | JPG | 3271.7 | WEBP | 413.8 | 87.4% |
| src/components/assets/images/gallery6.jpg | 7342×4900 | JPG | 3720.2 | WEBP | 394.1 | 89.4% |
| src/components/assets/images/gallery7.jpg | 7316×4883 | JPG | 2334.8 | WEBP | 348.7 | 85.1% |
| src/components/assets/images/gallery8.jpg | 7360×4912 | JPG | 1686.8 | WEBP | 250.7 | 85.1% |
| src/components/assets/images/gallery9.jpg | 7360×4912 | JPG | 2001.7 | WEBP | 316.1 | 84.2% |
| src/components/assets/images/logo-2.PNG | 1178×233 | PNG | 34.6 | PNG | 34.6 | 0.0% |
| src/components/assets/images/logo.png | 1536×1024 | PNG | 970.8 | WEBP | 20.1 | 97.9% |
| src/components/assets/images/microcement1.jpg | 5553×3541 | JPG | 1661.2 | WEBP | 500.2 | 69.9% |

До: 27.20 MB. Після: 4.39 MB. Економія: 22.81 MB (83.9%).

Фотографії галереї: 960 / 1600 / 2400 px; gallery2 (Hero): 960 / 1600 / 3200 px. Approach: 960 / 1920 px. Пропорції та кадрування CSS збережено.

logo-2.PNG не використовується на сайті; залишено оригінал, оскільки WebP збільшував вагу. public/logo.png збережено у PNG для favicon/apple-touch-icon, 512×512.

Виявлено попередньо відсутній public/og-image.jpg, на який посилаються SEO-метадані. Цей файл не є видимим зображенням сторінки; метадані не змінено. Зовнішні URL зображень адмінпанелі не конвертувалися локально; додано lazy/async.

Оригінали замінених файлів додатково збережено у /tmp/lux-image-originals (тимчасова резервна копія); на сайті всі фотографії збережені.
