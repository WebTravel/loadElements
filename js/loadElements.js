window.onload = function() {

  var defaults = {
    'selector' : '.filter__item',//элементы к которым будет применен метод
    'childrenElements' : '.filter__option',//дочерние элементы, больше числа которых появляется кнопка раскрытия
    'count' : 3,//число, после которого появится раскрытие
    'speed' : 250,//скорость раскрытия блока по нажатию на кнопку показа
    'textMore' : '+ Показать все',//Текст для кнопки "Показать все"
    'textLess' : '- Скрыть'//Текст для кнопки "Cкрыть"
  }


  function LoadElements(element, options) {
    var extend = function(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
          continue;
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key))
            out[key] = arguments[i][key];
        }
      }
      return out;
    };

    this.options = extend({}, defaults, options);
    this.element = element;
    this.init();
  }


  LoadElements.prototype.init = function() {
    //Переменные, используемые в плагине
    var elList = document.querySelectorAll(defaults.selector); //находим все элементы на странице, к которым нужно применить метод

    Array.prototype.forEach.call(elList, function(el, i) { //Обходим в цикле все элементы
        var countChildren = elList[i].querySelectorAll(defaults.childrenElements);
        if(countChildren.length > defaults.count) {
          //Создаем контейнер, куда будем перемещать все элементы, которые нужно скрыть.
          var container = document.createElement('div');
              container.className = 'loadContainer';
          //Создаем кнопку для раскрытия списка
          var showAll = document.createElement('div');
              showAll.className = 'loadMore';
              showAll.innerHTML = defaults.textMore;
          //Присваиваем контейнер в наш элемент
          elList[i].appendChild(container);
          //Присваиваем кнопку в наш элемент
          elList[i].appendChild(showAll);
          //Выбираем все элементы, которые будем скрывать и отправлем их в контейнер
          for(var j = 0; j < countChildren.length; j++) {
            if(j > defaults.count - 1) {
              container.appendChild(countChildren[j]);
            }
          }

          //Поочередно разворачиваем и сворачиваем контейнер при нажатии
          showAll.onclick = function() {
            this.previousElementSibling.classList.toggle('active');
          }

        }

    });

  }

  (function(window) {
    window.loadElements = function(element, options) {
        this.element = element;
        new LoadElements(this, options);
    }
    return this;
  })(window);


  document.querySelectorAll('.filter__item').loadElements({
    'count' : 1,
    'textMore' : 'Развернуть',
    'textLess' : 'Свернуть'
  }); 
  

}
