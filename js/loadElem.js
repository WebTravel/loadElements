 if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}



 window.addEventListener("DOMContentLoaded", function() {

    function wrap(create, elms, all) {
        function fn(item, i) {
            var to = all || i == len - 1 ? create : create.cloneNode(true);
            item = item.parentNode.replaceChild(to, item);
            to.appendChild(item)
        }
        var len = elms.length;
        len ? [].forEach.call(elms, fn) : fn(elms)
    }

    var defaults = {
        "childrenElements": ".filter__option",
        "count": "3",
        "speed": "250",
        "textMore": "+ Показать все",
        "textLess": "- Скрыть"
    };

    window.LoadElements = function LoadElements(elements, options) {
        if (!(this instanceof LoadElements)) return new LoadElements(elements, options);
        this.options = Object.assign({}, defaults, options);
        this.elements = typeof elements === "string" ? document.querySelectorAll(elements) :
            elements.length ? elements : [elements];
        this.init()
    };
    
    LoadElements.prototype.init = function() {
        var self = this;
        [].forEach.call(self.elements, function(el) {
            var countChildren = el.querySelectorAll(self.options.childrenElements);
            countChildren = [].slice.call(countChildren, self.options.count);
            if (countChildren.length) {
                var container = document.createElement("div");
                container.className = "loadContainer";
                wrap(container, countChildren, true);
                var showAll = document.createElement("div");
                showAll.className = "loadMore";
                showAll.innerHTML = self.options.textMore;
                showAll.addEventListener("click", function() {
                    container.classList.toggle("active");
                    showAll.innerHTML = container.classList.contains("active") ? self.options.textLess : self.options.textMore
                });
                container.parentNode.insertBefore(showAll, container.nextSibling)
            }
        })
    };
    
    

    //Вызов метода
    LoadElements(".filter__item", {
      'textMore': 'Дай еще',
      'textLess': 'Хватит уже',
      'count': '1'
    })

});