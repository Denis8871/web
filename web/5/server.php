<?php // php -S localhost:3000
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["number"])) { // Перевіряємо, чи запит методом POST і чи задано параметр "number"
    $num = $_POST["number"]; // отримуємо значення параметра
    if (is_numeric($num)) {
        $square = $num * $num;
        echo "$square";
    } else {
        echo "Помилка: введене значення не є числом.";
    }
} else {
    echo "Некоректний запит.";
}
?>
