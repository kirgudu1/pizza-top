<?php
include "meta.php"; // Подключаем файл с мета-информацией
$page = basename($_SERVER['PHP_SELF']);
$title = $meta_tags[$page]['title'] ?? "По умолчанию";
$description = $meta_tags[$page]['description'] ?? "Описание по умолчанию";
$h1 = $meta_tags[$page]['h1'] ?? $title; // Если H1 не указан, используем Title
$content = $meta_tags[$page]['content'] ?? ""; // Первый абзац после H1
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">

<title><?= htmlspecialchars($title) ?></title>
<meta name="description" content="<?= htmlspecialchars($description) ?>">
	
</head>
<body>

<!-- Подключаем верхнее меню -->
<?php include 'header.php'; ?>



<?php
// Собираем список ТОП-доставок, чтобы sidebar.php использовал его
$sushiBlocks = [];
$rank = 1;

// Ищем все блоки с ТОП-доставками на странице
foreach (glob("*.php") as $filename) {
    if ($filename !== "sidebar.php" && $filename !== "header.php" && $filename !== "footer.php") {
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML(file_get_contents($filename));
        $xpath = new DOMXPath($dom);
        $nodes = $xpath->query('//div[contains(@class, "sushi-ranking")]');

        foreach ($nodes as $node) {
            $titleNode = $xpath->query('.//h2', $node);
            $title = $titleNode->length > 0 ? $titleNode->item(0)->nodeValue : "Без названия";
            $sushiBlocks[] = $title;
            $rank++;
        }
    }
}
?>

<!-- Подключаем боковое меню -->
<?php include 'sidebar.php'; ?>



	
	

    <!-- Основной контент -->
	
	    <div class="content">
   <div class="sushi-block">
   
   <!-- ======== МОЙ КОНТЕНТ НАЧАЛО ======== -->
	
<!-- ======== Заголовок страницы города ======== -->
<div class="city-header">
<h1><?= htmlspecialchars($h1) ?></h1>
<?php if (!empty($content)): ?>
    <p><?= nl2br(htmlspecialchars($content)) ?></p>
<?php endif; ?>
</div>
<!-- ======== Конец заголовка страницы города ======== -->
	<?php include 'rating-info.php'; ?>
	
	

	<!--startblok-->
<!-- ======== Ollis НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Ollis</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.82</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">245</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (812) 343-76-28</li>
<li><strong>Сайт:</strong> <a href="https://ollis.ru" target="_blank">ollis.ru</a></li>
<li><strong>Цены:</strong> от 450 рублей</li>
<li><strong>График работы:</strong> ПН – ЧТ: 10:00 – 22:00; ПТ – ВС: 10:00 – 23:00</li>
</ul>
</div>
<p>Ollis — это востребованный сервис доставки пиццы, известный благодаря разнообразному меню и высокому качеству обслуживания. Здесь можно найти как классические пиццы, так и необычные авторские блюда. Заказ, доставка и отличный сервис делают Ollis хорошим выбором для жителей Самары.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">450 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">600 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата, Мобильные платежи</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классические пиццы: Маргарита, Пепперони, Гавайская</li>
<li><span class="sushi-icons">🍕</span> Авторские пиццы: Итальянская, Ткемали, Понтийская</li>
<li><span class="sushi-icons">🌱</span> Вегетарианские варианты</li>
<li><span class="sushi-icons">🍕</span> Безглютеновые пиццы</li>
<li><span class="sushi-icons">🥗</span> Закуски и салаты</li>
<li><span class="sushi-icons">🥤</span> Напитки и десерты</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ</li>
<li>💳 Бонусы на следующую покупку для постоянных клиентов</li>
<li>🔥 Специальные предложения каждую неделю</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий ассортимент пицц</li>
<li>Высокое качество ингредиентов</li>
<li>Быстрая и надежная доставка</li>
<li>Удобное мобильное приложение для заказа</li>
<li>Приятные акции и скидки для клиентов</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Отсутствие возможности оплаты картой при доставке</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://ollis.ru" target="_blank">ollis.ru</a><br>
<span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Выберите ваш любимый набор пицц</span></li>
<li>💳 <span class="order-text">Оформите заказ, указав предпочтительный способ оплаты</span></li>
<li>🚀 <span class="order-text">Подождите немного и насладитесь восхитительным ужином!</span></li>
</ul>
<a href="https://ollis.ru/" target="_blank" class="order-button">Посмотреть цены в Ollis</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Ollis КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Папа Джонс НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Папа Джонс</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.78</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">265</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всем районам города</li>
<li><strong>Телефон:</strong> +7 (495) 287-64-39</li>
<li><strong>Сайт:</strong> <a href="https://papajohns.ru" target="_blank">papajohns.ru</a></li>
<li><strong>Цены:</strong> от 700 рублей</li>
<li><strong>График работы:</strong> ежедневно, 10:00–23:00</li>
</ul>
</div>
<p>Папа Джонс — знаменитая международная сеть пиццерий, известная своими уникальными рецептами и высокими стандартами качества. В Самаре клиенты ценят быструю доставку и возможность заказать пиццу онлайн. Папа Джонс предлагает разнообразные комбинации начинок, что делает заказы интересными и вкусными.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">700 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">700 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">49 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Оригинальные пиццы с различными начинками</li>
<li><span class="sushi-icons">🥗</span> Свежие салаты</li>
<li><span class="sushi-icons">🥙</span> Закуски и десерты</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎁 Программа лояльности "ПапаБонус" с накопительными скидками</li>
<li>🔥 Специальные предложения на самые популярные позиции</li>
<li>🍕 Скидки на определенные пиццы в определенные дни</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Уникальные авторские рецепты пиццы</li>
<li>Широкая зона доставки</li>
<li>Удобный онлайн-заказ</li>
<li>Регулярные акции и скидки</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Частые жалобы на задержки доставки</li>
<li>Трудности с дозвоном в службу поддержки</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Зайдите на сайт</span> <a href="https://papajohns.ru" target="_blank">papajohns.ru</a><br> <span class="order-text">или скачайте мобильное приложение</span> </li>
<li>🍕 <span class="order-text">Выберите любимые блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите предпочтительный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ждите курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://papajohns.ru" target="_blank" class="order-button">Посмотреть цены в Папа Джонс</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Папа Джонс КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Два берега НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Два берега</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.85</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">245</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (812) 237-46-81</li>
<li><strong>Сайт:</strong> <a href="https://2-berega.ru" target="_blank">2-berega.ru</a></li>
<li><strong>Цены:</strong> от 600 рублей</li>
<li><strong>График работы:</strong> Круглосуточно</li>
</ul>
</div>
<p>Два берега — это популярная сеть ресторанов, известная своим широким выбором пиццы и других блюд, включая уникальные авторские рецепты. Компания обеспечивает качественную доставку, позволяя клиентам заказывать вкусную еду в любое время, что делает Два берега идеальным выбором для любителей пиццы в Самаре.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">600 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатна</strong> при заказе от</span> <span class="price-highlight">1000 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классическая пицца: "Маргарита", "Пепперони", "Гавайская"</li>
<li><span class="sushi-icons">🍕</span> Авторские пиццы: "Две берега", "Кунжутная"</li>
<li><span class="sushi-icons">🥗</span> Салаты: "Цезарь", "Греческий"</li>
<li><span class="sushi-icons">🍴</span> Закуски: "Чесночные гриссини", "Картофель по-деревенски"</li>
<li><span class="sushi-icons">🍰</span> Десерты: "Тирамису", "Чизкейк"</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ</li>
<li>💳 Накопительные бонусы для постоянных клиентов</li>
<li>🔥 Специальные предложения на выходные</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий ассортимент пиццы и блюд</li>
<li>Заключение на свежих ингредиентах</li>
<li>Оперативная доставка к вашему столу</li>
<li>Удобный онлайн-сервис для оформления заказов</li>
<li>Регулярные акции и специальные предложения</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Возможные задержки в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Зайдите на сайт</span> <a href="https://2-berega.ru" target="_blank">2-berega.ru</a><br>
<span class="order-text">или скачайте приложение</span>
</li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите подходящий способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидайте курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://2-berega.ru" target="_blank" class="order-button">Посмотреть цены в Два берега</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Два берега КОНЕЦ ======== -->
<!--endblok-->
 
  
 <!--startblok-->
<!-- ======== Yes! Pizza НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Yes! Pizza</h2>
<ul>
<li class="rating-item"> <strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.85</span><br> <span class="rating-text">на основе</span> <span class="rating-count">275</span> отзывов </li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 362-75-49</li>
<li><strong>Сайт:</strong> <a href="https://samara.yespizza.ru" target="_blank">samara.yespizza.ru</a></li>
<li><strong>Цены:</strong> от 319 рублей</li>
<li><strong>График работы:</strong> 9:00 – 21:00</li>
</ul>
</div>
<p>Yes! Pizza - популярная пиццерия, расположенная в ТРЦ "Космопорт", которая славится своими вкусными пиццами и уникальным тестом. У них есть удобный сервис доставки, что позволяет жителям Самары легко заказывать свои любимые блюда, не выходя из дома.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">800 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму.</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классическая пицца: Маргарита, Пепперони, Четыре сыра</li>
<li><span class="sushi-icons">🍖</span> Пицца с мясом: Мясная, BBQ, Овощная</li>
<li><span class="sushi-icons">🌱</span> Вегетарианские пиццы с свежими ингредиентами</li>
<li><span class="sushi-icons">🥗</span> Салаты для полноты обеда</li>
<li><span class="sushi-icons">🍰</span> Десерты: Тирамису, Чизкейк</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎁 1+1 на все пиццы в понедельник</li>
<li>💳 Система накопительных баллов для постоянных клиентов</li>
<li>🔥 Сезонные скидки и специальные предложения</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий выбор пиццы и дополнительных блюд</li>
<li>Бесплатная доставка при достаточной сумме заказа</li>
<li>Регулярные акции и скидки для всех клиентов</li>
<li>Удобное оформление заказа через сайт</li>
<li>Высокое качество ингредиентов и уникальное тесто</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма для бесплатной доставки может быть высока</li>
<li>В часы пик возможны задержки в доставке</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://samara.yespizza.ru" target="_blank">samara.yespizza.ru</a><br> <span class="order-text">или скачайте мобильное приложение</span> </li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ, выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидание курьера и наслаждение вкусной пиццей!</span></li>
</ul>
<a href="https://samara.yespizza.ru" target="_blank" class="order-button">Посмотреть цены в Yes! Pizza</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Yes! Pizza КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Piccola Pizza НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Piccola Pizza</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.85</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">220</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 320-47-89</li>
<li><strong>Сайт:</strong> <a href="https://piccola-pizza.ru" target="_blank">piccola-pizza.ru</a></li>
<li><strong>Цены:</strong> от 290 рублей</li>
<li><strong>График работы:</strong> ПН – ПТ: 10:00 – 22:00; СБ – ВС: 11:00 – 23:00</li>
</ul>
</div>
<p>Piccola Pizza — это уютная пиццерия с широким выбором блюд и приемлемыми ценами. Здесь каждый найдет себе что-то по вкусу, ведь пиццы начинаются всего с 290 рублей. Быстрая доставка и возможность заказа делают Piccola Pizza отличным выбором для жителей Самары.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">700 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">100 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классическая пицца: маргарита, пепперони, вегетарианская</li>
<li><span class="sushi-icons">🍕</span> Специальные предложения: пицца с морепродуктами, BBQ, мексиканская</li>
<li><span class="sushi-icons">🍣</span> Роллы: с лососем, курицей, вегетарианские</li>
<li><span class="sushi-icons">🥤</span> Напитки: широкий выбор безалкогольных и алкогольных</li>
<li><span class="sushi-icons">🍰</span> Десерты: чизкейки, тирамису</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ</li>
<li>📦 Бесплатная доставка при заказе на сумму от 700 рублей</li>
<li>💳 Программа лояльности: накопительные бонусы для постоянных клиентов</li>
<li>🔥 Регулярные акции на популярные блюда</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Большой выбор пиццы и роллов</li>
<li>Доступные цены и частые акции</li>
<li>Быстрая и бесплатная доставка при заказе от 700 рублей</li>
<li>Удобный сайт для заказа</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Возможно, время ожидания в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://piccola-pizza.ru" target="_blank">piccola-pizza.ru</a><br>
<span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Дождитесь курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://piccola-pizza.ru/" target="_blank" class="order-button">Посмотреть цены в Piccola Pizza</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Piccola Pizza КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Farfor НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Farfor</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.86</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 324-18-45</li>
<li><strong>Сайт:</strong> <a href="https://samara.farfor.ru/category/pizza" target="_blank">samara.farfor.ru</a></li>
<li><strong>Цены:</strong> от 290 рублей</li>
<li><strong>График работы:</strong> Пн-Вс: 10:00 – 22:00</li>
</ul>
</div>
<p>Farfor — это ресторан доставки пиццы и роллов, известный своим разнообразием и качеством блюд. Благодаря удобным онлайн-заказам и доставке, жители Самары могут наслаждаться вкусной едой, не выходя из дома. Преимущества включают быстрое обслуживание и выгодные предложения для клиентов.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">700 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">700 рублей</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Разнообразные пиццы: классические, с начинками на выбор</li>
<li><span class="sushi-icons">🍣</span> Роллы: унаги, с лососем, и вегетарианские</li>
<li><span class="sushi-icons">🥗</span> Свежие салаты: из seasonal овощей</li>
<li><span class="sushi-icons">🍰</span> Десерты: чизкейки и мороженое</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🔥 2 пиццы по цене одной</li>
<li>🎉 Бесплатная доставка при заказе от 700 рублей</li>
<li>💳 Бонусная программа для постоянных клиентов</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий ассортимент блюд</li>
<li>Быстрая доставка по городу</li>
<li>Регулярные акции и скидки</li>
<li>Удобное онлайн-меню для заказа</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Не всегда доступен телефон для связи</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://samara.farfor.ru/category/pizza" target="_blank">samara.farfor.ru</a><br>
<span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Дождитесь курьера и наслаждайтесь вкусной едой!</span></li>
</ul>
<a href="https://samara.farfor.ru/category/pizza" target="_blank" class="order-button">Посмотреть цены в Farfor</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Farfor КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Додо Пицца НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Додо Пицца</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.82</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">210</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, районы по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 256-24-68</li>
<li><strong>Сайт:</strong> <a href="https://dodopizza.ru/samara" target="_blank">dodopizza.ru/samara</a></li>
<li><strong>Цены:</strong> от 379 рублей</li>
<li><strong>График работы:</strong> Ежедневно: 10:00 – 00:00</li>
</ul>
</div>
<p>Додо Пицца - это популярная пиццерия с быстрой доставкой, известная своими вкусными пиццами и разнообразным меню. Заказав доставку в Самаре, клиенты могут рассчитывать на быстрое обслуживание и разные предложения для насыщенного ужина. Додо Пицца делает акцент на высоком качестве и быстроте сервиса.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">800 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Пиццы различных видов: классические, вегетарианские, с морепродуктами</li>
<li><span class="sushi-icons">🥗</span> Закуски: салаты и горячие закуски</li>
<li><span class="sushi-icons">🥤</span> Напитки: соки, газировка и алкогольные коктейли</li>
<li><span class="sushi-icons">🍰</span> Десерты: пирожные и мороженое</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Специальные скидки для новых клиентов</li>
<li>💳 Накопительная программа бонусов</li>
<li>🔥 Регулярные акции на популярные позиции</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий выбор пицц и закусок</li>
<li>Быстрая доставка на всей территории города</li>
<li>Удобное онлайн-отслеживание заказа</li>
<li>Наличие мобильного приложения для простоты заказа</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Некоторые продукты могут быть недоступны в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://dodopizza.ru/samara" target="_blank">dodopizza.ru/samara</a><br>
<span class="order-text">или скачайте приложение</span>
</li>
<li>🍕 <span class="order-text">Выберите любимые блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидайте курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://dodopizza.ru/samara" target="_blank" class="order-button">Посмотреть цены в Додо Пицца</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Додо Пицца КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Ташир Пицца НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Ташир Пицца</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.85</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">278</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 123-45-67</li>
<li><strong>Сайт:</strong> <a href="https://tashirpizza.ru/samara" target="_blank">tashirpizza.ru/samara</a></li>
<li><strong>Цены:</strong> от 295 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 23:00</li>
</ul>
</div>
<p>Ташир Пицца — излюбленная пиццерия в Самаре, известная своими вкусными и разнообразными блюдами. Благодаря качественным ингредиентам и быстрой доставке, клиенты могут наслаждаться любимыми пиццами, не выходя из дома. Заказ можно оформить легко и быстро через сайт или мобильное приложение.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">600 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата, Электронные кошельки</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классические пиццы: Маргарита, Пепперони, Гавайская</li>
<li><span class="sushi-icons">🍕</span> Запеченные и панированные пиццы</li>
<li><span class="sushi-icons">🍕</span> Специальные предложения: Пицца дня, Сеты</li>
<li><span class="sushi-icons">🥗</span> Салаты и закуски</li>
<li><span class="sushi-icons">🥤</span> Напитки на любой вкус</li>
<li><span class="sushi-icons">🍰</span> Десерты</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Специальная скидка 50% на вторую пиццу при использовании промокода 5050</li>
<li>💳 Накопительные бонусы для постоянных клиентов</li>
<li>🔥 Регулярные акции на популярные блюда</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Вкусные и свежие ингредиенты</li>
<li>Доставка по всему городу</li>
<li>Широкий ассортимент блюд</li>
<li>Скидки и акции для всех клиентов</li>
<li>Удобное приложение для заказа</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Некоторые блюда могут быть недоступны в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Перейдите на сайт</span> <a href="https://tashirpizza.ru/samara" target="_blank">tashirpizza.ru/samara</a><br>
<span class="order-text">или скачайте мобильное приложение</span> </li>
<li>🍕 <span class="order-text">Выберите свои любимые блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Завершите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидайте курьера и наслаждайтесь вашей пиццей!</span></li>
</ul>
<a href="https://tashirpizza.ru/samara" target="_blank" class="order-button">Посмотреть цены в Ташир Пицца</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Ташир Пицца КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== PizzaRikka НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>PizzaRikka</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.85</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 913-57-42</li>
<li><strong>Сайт:</strong> <a href="https://pizzarikka.ru" target="_blank">pizzarikka.ru</a></li>
<li><strong>Цены:</strong> от 299 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 23:00</li>
</ul>
</div>
<p>PizzaRikka — это популярная пиццерия в Самаре, известная своим разнообразием пицц и комбо-наборов. Они предлагают быструю доставку от 40 минут и удобный способ оформления заказа через сайт. Клиенты ценят PizzaRikka за доступные цены и акции, что делает их выбором для любителей пиццы в городе.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">299 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">600 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличными, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="pizza-icons">🍕</span> Классические пиццы: Маргари710, Пепперони, Гавайская</li>
<li><span class="pizza-icons">🍕</span> Авторские пиццы: Трюфельная, Острые креветки</li>
<li><span class="pizza-icons">🥗</span> Закуски: Салат Цезарь, Острая жареная курица</li>
<li><span class="pizza-icons">🍰</span> Десерты: Чизкейк, Тирамису</li>
<li><span class="pizza-icons">🥤</span> Напитки: Лимонады, Соки, Вода</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ через сайт</li>
<li>💳 Постоянные клиенты получают бонусы за каждый заказ</li>
<li>🔥 Акция 3+1: купите три пиццы и получите четвертую в подарок!</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Быстрая доставка</li>
<li>Широкий ассортимент пицц и закусок</li>
<li>Регулярные акции и скидки</li>
<li>Удобный сайт для оформления заказа</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Некоторые пиццы доступны только по предварительному заказу</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Заходите на сайт</span> <a href="https://pizzarikka.ru" target="_blank">pizzarikka.ru</a><br>
<span class="order-text">или используйте мобильное приложение</span> </li>
<li>🍕 <span class="order-text">Выберите ваши любимые пиццы и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите предпочтительный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидайте курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://pizzarikka.ru/" target="_blank" class="order-button">Посмотреть цены в PizzaRikka</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== PizzaRikka КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== PizzaShop63 НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>PizzaShop63</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.86</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">225</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу и пригородам</li>
<li><strong>Телефон:</strong> +7 (917) 032-21-45</li>
<li><strong>Сайт:</strong> <a href="https://pizzashop63.ru" target="_blank">pizzashop63.ru</a></li>
<li><strong>Цены:</strong> от 299 рублей</li>
<li><strong>График работы:</strong> Пн-Вс: 10:00 – 00:00</li>
</ul>
</div>
<p>PizzaShop63 — это популярная служба доставки пиццы и роллов в Самаре, известная качественным сервисом и разнообразием блюд. Благодаря удобному заказу через телефон и сайт, клиенты могут наслаждаться быстрой доставкой вкусной еды в любое время.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">1000 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Пицца: классическая, с грибами, мясная</li>
<li><span class="sushi-icons">🍣</span> Роллы: с лососем, овощами, панированные</li>
<li><span class="sushi-icons">🥗</span> Салаты: Цезарь, овощной микс</li>
<li><span class="sushi-icons">🍹</span> Напитки: безалкогольные, соки</li>
<li><span class="sushi-icons">🍰</span> Десерты: мороженое, тирамису</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ</li>
<li>📦 Бесплатная доставка при заказе от 1000 рублей</li>
<li>🎊 Специальные предложения в выходные</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий ассортимент блюд</li>
<li>Высокое качество ингредиентов</li>
<li>Удобные способы оформления заказа</li>
<li>Быстрая доставка по всему городу</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Не всегда успевают в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://pizzashop63.ru" target="_blank">pizzashop63.ru</a><br> <span class="order-text">или скачайте приложение</span></li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Завершите оформление заказа и выберите способ оплаты</span></li>
<li>🚀 <span class="order-text">Дождитесь курьера и наслаждайтесь вашей пиццей!</span></li>
</ul>
<a href="https://pizzashop63.ru/" target="_blank" class="order-button">Посмотреть цены в PizzaShop63</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== PizzaShop63 КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Pizzalend НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Pizzalend</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.87</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">245</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 924-35-61</li>
<li><strong>Сайт:</strong> <a href="https://pizzalend.ru" target="_blank">pizzalend.ru</a></li>
<li><strong>Цены:</strong> от 289 рублей</li>
<li><strong>График работы:</strong> ПН – ВТ: 10:00 – 22:00; СР – ПТ: 10:00 – 23:00; СБ – ВС: 11:00 – 00:00</li>
</ul>
</div>
<p>Pizzalend - это любимая многими пиццерия в Самаре, которая предлагает вкусную пиццу с разнообразными начинками. Благодаря быстрой доставке и удобному онлайн-заказу, каждый может насладиться любимыми блюдами, оставаясь дома.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">700 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Пицца всех видов: классическая, с тонким тестом, вегетарианская</li>
<li><span class="sushi-icons">🍝</span> Пасты различных видов: карбонара, болоньезе, песто</li>
<li><span class="sushi-icons">🥗</span> Закуски: салаты свежие, закусочные тарелки</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% для новых клиентов</li>
<li>🔥 Акция “2+1”: при заказе двух пицц, третья в подарок</li>
<li>💳 Программа лояльности: накопительные скидки для постоянных клиентов</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий выбор пиццы и других блюд</li>
<li>Быстрая и бесплатная доставка по городу</li>
<li>Щедрые акции и программа лояльности</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Возможные задержки в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://pizzalend.ru" target="_blank">pizzalend.ru</a><br>
<span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Дождитесь курьера и наслаждайтесь вкусным угощением!</span></li>
</ul>
<a href="https://pizzalend.ru/" target="_blank" class="order-button">Посмотреть цены в Pizzalend</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Pizzalend КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Domino’s Pizza НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Domino’s Pizza</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.85</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, вся территория города</li>
<li><strong>Телефон:</strong> +7 (846) 732-41-50</li>
<li><strong>Сайт:</strong> <a href="https://dominospizza.ru" target="_blank">dominospizza.ru</a></li>
<li><strong>Цены:</strong> от 399 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 00:00</li>
</ul>
</div>
<p>Domino’s Pizza — это популярная международная сеть, известная своим широким ассортиментом пиццы и быстрой доставкой. Клиенты ценят удобство онлайн-заказа и множество акций, которые делают заказ еще приятнее. В Самаре Domino’s Pizza предлагает качественную доставку, благодаря которой вы сможете насладиться любимой пиццей в любой точке города.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">399 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">799 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li>🍕 Пиццы: классическая, с мясом, вегетарианская</li>
<li>🥗 Салаты: Цезарь, греческий и другие</li>
<li>🍝 Пасты: карбонара, болоньезе</li>
<li>🍔 Бургеры: куриные, говяжьи и вегетарианские</li>
<li>🍨 Десерты: мороженое, чизкейки</li>
<li>🥤 Напитки: соки, газировка, пиво</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 25% при самовывозе</li>
<li>🔥 Акция на 2-ю пиццу со скидкой 50%</li>
<li>💳 Программа лояльности с накопительными бонусами</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Быстрая доставка в течение 30 минут</li>
<li>Удобный онлайн-заказ и оплата</li>
<li>Широкий ассортимент блюд</li>
<li>Регулярные акции и скидки для клиентов</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Иногда возможны небольшие задержки в часы пик</li>
<li>Минимальная сумма заказа для бесплатной доставки</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://dominospizza.ru" target="_blank">dominospizza.ru</a><br>
<span class="order-text">или скачайте приложение для смартфона</span>
</li>
<li>🍕 <span class="order-text">Выберите любимые блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ждите курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://dominospizza.ru/" target="_blank" class="order-button">Посмотреть цены в Domino’s Pizza</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Domino’s Pizza КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Pizza Fly НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Pizza Fly</h2>
<ul>
<li class="rating-item"> <strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.87</span><br> <span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов </li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 302-15-67</li>
<li><strong>Сайт:</strong> <a href="https://pizzafly.ru" target="_blank">pizzafly.ru</a></li>
<li><strong>Цены:</strong> от 299 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 23:00</li>
</ul>
</div>
<p>Pizza Fly — это дважды ошеломляющая служба доставки пиццы и пасты в Самаре. Известная своими быстрыми доставками и разнообразием блюд, она завоевала сердца местных жителей. Если вы хотите заказать пиццу или пасту в Самаре, Pizza Fly предлагает отличное предложение для всех фанатов вкусной еды.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">500 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">700 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Разнообразные пиццы: классические, с овощами, мясные</li>
<li><span class="sushi-icons">🍝</span> Паста с различными соусами</li>
<li><span class="sushi-icons">🥗</span> Свежие салаты</li>
<li><span class="sushi-icons">🍰</span> Десерты на выбор</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🆓 Бесплатная доставка на первый заказ</li>
<li>💳 Программа лояльности: накопительные скидки</li>
<li>🔥 Еженедельные акции и предложения</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий выбор блюд</li>
<li>Быстрая доставка</li>
<li>Удобный онлайн-заказ</li>
<li>Регулярные акции</li>
<li>Качественные ингредиенты</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Ограниченные зоны доставки в отдаленных районах</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://pizzafly.ru" target="_blank">pizzafly.ru</a><br> <span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Дождитесь курьера и наслаждайтесь вкусной едой!</span></li>
</ul>
<a href="https://pizzafly.ru" target="_blank" class="order-button">Посмотреть цены в Pizza Fly</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Pizza Fly КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Pizza Mia НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Pizza Mia</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.86</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов
</li>
<li><strong>География доставки:</strong> Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 643-29-57</li>
<li><strong>Сайт:</strong> <a href="https://pizzamia.ru" target="_blank">pizzamia.ru</a></li>
<li><strong>Цены:</strong> от 330 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 23:00</li>
</ul>
</div>
<p>Pizza Mia - это любимая пиццерия жителей Самары, предлагающая широкий ассортимент как классических, так и оригинальных авторских пицц. Их главное преимущество - быстрая доставка и удобный онлайн-заказ, что делает Pizza Mia идеальным выбором для жителей города.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">600 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">1000 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классические пиццы: Маргарита, Пепперони, Четыре сыра</li>
<li><span class="sushi-icons">🍕</span> Авторские пиццы: Специальные seasonal предложения</li>
<li><span class="sushi-icons">🍝</span> Итальянские пасты</li>
<li><span class="sushi-icons">🥗</span> Свежие салаты и закуски</li>
<li><span class="sushi-icons">🍷</span> Напитки и десерты</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ</li>
<li>💳 Программа лояльности для постоянных клиентов</li>
<li>🔥 Регулярные акции на популярные блюда</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий выбор пицц и блюд</li>
<li>Быстрая и бесплатная доставка при заказе от 1000 рублей</li>
<li>Удобный онлайн-заказ</li>
<li>Регулярные акции и специальные предложения</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>В редких случаях возможны задержки в час пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Перейдите на сайт</span> <a href="https://pizzamia.ru" target="_blank">pizzamia.ru</a><br>
<span class="order-text">или используйте мобильное приложение</span> </li>
<li>🍕 <span class="order-text">Выберите пиццу и добавьте в вашу корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ждите курьера и наслаждайтесь пиццей!</span></li>
</ul>
<a href="https://pizzamia.ru/" target="_blank" class="order-button">Посмотреть цены в Pizza Mia</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Pizza Mia КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Pizza Mafia НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Pizza Mafia</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.75</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">210</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 453-12-67</li>
<li><strong>Сайт:</strong> <a href="https://pizzamafia63.ru" target="_blank">pizzamafia63.ru</a></li>
<li><strong>Цены:</strong> от 320 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 23:00</li>
</ul>
</div>
<p>Pizza Mafia - это отличное место для любителей настоящей итальянской пиццы, работающей на рынке доставки. Компания предлагает быструю доставку и широкий ассортимент вкусных блюд. Заказ еды в Самаре с Pizza Mafia — это всегда свежая и горячая пицца, которая будет доставлена к вашему порогу в кратчайшие сроки.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">700 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">700 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">100 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классическая пицца: Маргарита, Пепперони, Гавайская</li>
<li><span class="sushi-icons">🥗</span> Закуски и салаты</li>
<li><span class="sushi-icons">🥤</span> Напитки: безалкогольные и алкогольные</li>
<li><span class="sushi-icons">🍰</span> Десерты: Тирамису и Чизкейк</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Скидка 10% на первый заказ</li>
<li>💳 Накопительные бонусы для постоянных клиентов</li>
<li>🔥 Специальные предложения по выходным</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Вкусная итальянская пицца</li>
<li>Быстрая доставка</li>
<li>Широкий выбор блюд и напитков</li>
<li>Акции и скидки для клиентов</li>
<li>Удобный онлайн-заказ</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Иногда возможны задержки в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://pizzamafia63.ru" target="_blank">pizzamafia63.ru</a><br>
<span class="order-text">или скачайте приложение</span>
</li>
<li>🍕 <span class="order-text">Выберите пиццы и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидайте курьера и наслаждайтесь свежей пиццей!</span></li>
</ul>
<a href="https://pizzamafia63.ru/" target="_blank" class="order-button">Посмотреть цены в Pizza Mafia</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Pizza Mafia КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Чиббис НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Чиббис</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.87</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 219-54-32</li>
<li><strong>Сайт:</strong> <a href="https://promo.chibbis.ru/samara-top-pizza" target="_blank">promo.chibbis.ru/samara-top-pizza</a></li>
<li><strong>Цены:</strong> от 250 рублей</li>
<li><strong>График работы:</strong> Пн – Пт: 10:00 – 22:00; Сб – Вс: 11:00 – 23:00</li>
</ul>
</div>
<p>Чиббис — известная платформа доставки пиццы в Самаре, которая предлагает собой разнообразие вкусных блюд по разумным ценам. Заказ пиццы здесь — это быстро и удобно, а доставка делает процесс настолько простым, что вы сможете наслаждаться любимыми моментами прямо у себя дома.</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">890 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">890 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">49 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классическая пицца: Маргарита, Пепперони, Греческая</li>
<li><span class="sushi-icons">🍕</span> Премиум пицца: Де Люкс с морепродуктами</li>
<li><span class="sushi-icons">🍗</span> Куриные наггетсы</li>
<li><span class="sushi-icons">🥗</span> Салаты: Цезарь, Греческий</li>
<li><span class="sushi-icons">🍰</span> Десерты: Торт, Пирожные</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎁 Скидка 10% на первый заказ</li>
<li>💳 Накопительная программа для постоянных клиентов</li>
<li>🔥 Специальные предложения по выходным</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Широкий выбор пиццы и закусок</li>
<li>Удобный и быстрый процесс заказа</li>
<li>Конкурентные цены и множественные акции</li>
<li>Качественные ингредиенты</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Возможно время ожидания доставки в часы пик</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://promo.chibbis.ru/samara-top-pizza" target="_blank">promo.chibbis.ru/samara-top-pizza</a><br>
<span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Подберите любимые блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Завершите оформление заказа и выберите способ оплаты</span></li>
<li>🚀 <span class="order-text">Ожидайте курьера и наслаждайтесь вашей пиццей!</span></li>
</ul>
<a href="https://promo.chibbis.ru/samara-top-pizza" target="_blank" class="order-button">Посмотреть цены в Чиббис</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Чиббис КОНЕЦ ======== -->
<!--endblok-->
<!--startblok-->
<!-- ======== Яндекс Еда НАЧАЛО ======== -->
<!-- ======== Основные данные начало ======== -->
<div class="sushi-ranking">
<div class="rank-label"></div>
<h2>Яндекс Еда</h2>
<ul>
<li class="rating-item">
<strong>Рейтинг:</strong> ⭐ <span class="rating-score">4.89</span><br>
<span class="rating-text">на основе</span> <span class="rating-count">215</span> отзывов
</li>
<li><strong>География доставки:</strong> г. Самара, доставка по всему городу</li>
<li><strong>Телефон:</strong> +7 (846) 920-73-19</li>
<li><strong>Сайт:</strong> <a href="https://eda.yandex.ru/samara/pizza" target="_blank">eda.yandex.ru/samara/pizza</a></li>
<li><strong>Цены:</strong> от 400 рублей</li>
<li><strong>График работы:</strong> Пн – Вс: 10:00 – 23:00</li>
</ul>
</div>
<p>Яндекс Еда — сервис, знакомый многим, предлагающий удобную доставку пиццы из ресторанов. Заказ можно сделать быстро и легко, а первая доставка будет бесплатной. Доставка в Самаре с Яндекс Еда — это возможность насладиться вкусной пиццей, не выходя из дома!</p>
<!-- ======== Основные данные конец ======== -->
<!-- ======== Блок Доставка и оплата ======== -->
<div class="sushi-section">
<h3>📦 Доставка и оплата</h3>
<ul class="delivery-list">
<li><strong>Минимальная сумма заказа:</strong> <span class="price-highlight">400 рублей</span></li>
<li>
<ul class="delivery-cost">
<li>✅ <span class="delivery-text"><strong>Доставка бесплатно</strong> при заказе от</span> <span class="price-highlight">800 рублей</span></li>
<li>💰 <span class="delivery-text"><strong>Стоимость доставки:</strong></span> <span class="price-highlight">150 рублей</span> <span class="delivery-text">при заказе на меньшую сумму</span></li>
</ul>
</li>
<li><strong>Способы оплаты:</strong> <span class="payment-methods">Наличные, Банковские карты, Онлайн-оплата</span></li>
</ul>
</div>
<!-- ======== Конец блока Доставка и оплата ======== -->
<!-- ======== Меню начало ======== -->
<div class="sushi-section">
<h3>🍽️ Выбор блюд</h3>
<ul>
<li><span class="sushi-icons">🍕</span> Классическая пицца: Маргарита, Пепперони, Четыре сезона</li>
<li><span class="sushi-icons">🌯</span> Закуски: Буррито, Тортильи</li>
<li><span class="sushi-icons">🥗</span> Салаты: Цезарь, Греческий</li>
<li><span class="sushi-icons">🧁</span> Десерты: Торт, Пирожные</li>
<li><span class="sushi-icons">🥤</span> Напитки: Соки, Лимонады, Вода</li>
</ul>
</div>
<!-- ======== Меню конец ======== -->
<!-- ======== Блок Акции и бонусы ======== -->
<div class="sushi-section">
<h3>🎁 Акции и бонусы</h3>
<ul>
<li>🎉 Первая доставка бесплатно</li>
<li>💳 Скидки для постоянных клиентов</li>
<li>🔥 Акции на популярные блюда</li>
</ul>
</div>
<!-- ======== Конец блока Акции и бонусы ======== -->
<!-- ======== Преимущества и Недостатки ======== -->
<div class="sushi-section">
<h3>✅ Преимущества</h3>
<ul class="advantage-list">
<li>Быстрая и бесплатная доставка при высоком заказе</li>
<li>Широкий выбор блюд</li>
<li>Удобный сайт и приложение для заказа</li>
<li>Привлекательные акции и скидки</li>
</ul>
<h3>❌ Недостатки</h3>
<ul class="disadvantage-list">
<li>Минимальная сумма заказа для бесплатной доставки</li>
<li>Стоимость доставки может быть высокой для небольших заказов</li>
</ul>
</div>
<!-- ======== Конец блока Преимущества и Недостатки ======== -->
<!-- ======== Блок Как сделать заказ? начало ======== -->
<div class="sushi-section">
<h3>🛒 Как сделать заказ?</h3>
<ul class="order-steps">
<li class="rating-item"> 📱 <span class="order-text">Посетите сайт</span> <a href="https://eda.yandex.ru/samara/pizza" target="_blank">еда.yandex.ru/samara/pizza</a><br>
<span class="order-text">или скачайте приложение</span> </li>
<li>🍕 <span class="order-text">Выберите блюда и добавьте их в корзину</span></li>
<li>💳 <span class="order-text">Оформите заказ и выберите удобный способ оплаты</span></li>
<li>🚀 <span class="order-text">Дождитесь курьера и наслаждайтесь вкусной пиццей!</span></li>
</ul>
<a href="https://eda.yandex.ru/samara/pizza" target="_blank" class="order-button">Посмотреть цены в Яндекс Еда</a>
</div>
<!-- ======== Конец блока Как сделать заказ? ======== -->
<!-- ======== Разделитель ======== -->
<div class="section-divider"></div>
<!-- ======== Яндекс Еда КОНЕЦ ======== -->
<!--endblok-->
 
 
	
	
	
	
  <!-- ======== МОЙ КОНТЕНТ КОНЕЦ ======== -->
<!-- Подключаем Популярные города -->
<?php include 'popular-cities.php'; ?>



</div>






    </div>

    <script>
        function toggleMenu() {
            document.getElementById("sidebar").classList.toggle("active");
        }
    </script>



<!-- Подключаем футер -->
<?php include 'footer.php'; ?>


<!-- Подключаем внешний JavaScript -->
<script src="scripts.js"></script>
</body>


</body>
</html>
