// Получаем доступ к элементам HTML
const textArea = document.getElementById("code-input");
const browserView = document.getElementById("browser-view");
const refreshButton = document.getElementById("refresh-button");

// Обработчик событий - клик по кнопке "обновить"
refreshButton.addEventListener("click", function() {
  // Получаем текст из textArea
  const codeText = textArea.value;

  // Преобразуем текст в HTML
  const htmlCode = convertToHtml(codeText);

  // Отображаем HTML в browserView
  browserView.innerHTML = htmlCode;
});


// Функция преобразования текста в HTML-код
function convertToHtml(text) {
  var html = "";

  // Загрузка внешней библиотеки Prism.js
  // Делаем это только один раз при первом вызове функции
  if (typeof Prism === "undefined") {
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js";
    document.head.appendChild(script);

    var link = document.createElement("link");
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  // Если текст содержит выражения JavaScript
  if (text.indexOf("<script>") >= 0) {
    // Используем простое фильтрование, чтобы удалить все <script> и </script>
    // и highlight весь код как javascript
    text = text.replace(/<script>/gi, "");
    text = text.replace(/<\/script>/gi, "");
    html = Prism.highlight(text, Prism.languages.javascript, "javascript");
  } else {
    // Преобразование текста кода в HTML
    try {
      var element = document.createElement("div");
      element.innerHTML = text;
      html = element.innerHTML;
    } catch (e) {
      html = Prism.highlight(text, Prism.languages.markup, "markup");
    }
  }

  return html;
}
