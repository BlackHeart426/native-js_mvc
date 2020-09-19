//Создание model
const modelCounter = function(n) {
  this.counter = n
}

//Добавление метода модели в прототип model
modelCounter.prototype.getCounter = function(type, fn) {
  //Изменения текущего состояние данных по полученому type
  type && (type === 'increaseCount' ? ++this.counter :  --this.counter)
  fn(this.counter)
}

//Создание view
const viewCounter = function (el) {
  this.el = el
  this.onClick = null
}

//Добавление метода render в прототип view
viewCounter.prototype.render = function(data) {
  //Заполнение html при render
  this.el.innerHTML = '<h3>Counter:</h3>' +
    '<p>' + data.counter + '</p>' +
    '<button id="decreaseCount" data-type="decreaseCount" class="decrease button" >-</button> ' +
    '<button id="increaseCount" data-type="increaseCount" class="increase button" >+</button>';

  //Привязка событий на кнопки
  const increaseCount = this.el.querySelector('#increaseCount');
  increaseCount.addEventListener('click', this.onClick);
  const decreaseCount = this.el.querySelector('#decreaseCount');
  decreaseCount.addEventListener('click', this.onClick);
}

//Создание onClick
const controllerCounter = function(view, model) {
  this.viewCounter = view
  this.modelCounter = model
}

//Добавление метода init в прототип controller
controllerCounter.prototype.init = function() {
  //Привязка метода onClick(view) с методом onClick(onClick) с контекстом
  this.viewCounter.onClick = this.onClick.bind(this)
  //Вызов метода getCounter(model) для получения данных в модели и
  //вызов showCounter для подготовки данных к рендеру
  this.modelCounter.getCounter(null, this.showCounter.bind(this))
}

//Добавление метода onClick в прототип controller
controllerCounter.prototype.onClick = function(e) {
  //Получение данных от события onClick(view)
  const target = e.currentTarget.dataset.type
  //Вызов метода getCounter(model) для получения измененных данных в модели и
  //вызов showCounter для подготовки данных к рендеру
  this.modelCounter.getCounter(target, this.showCounter.bind(this))
}

//Добавление метода showCounter в прототип controller
controllerCounter.prototype.showCounter = function(modelData) {
  //Подготовка данных к рендеру
  const viewModel = {
    counter: modelData
  }
  //Вызов render с подготовленными данными
  this.viewCounter.render(viewModel)
}

//Создание экземляра обьекта model и передача начального значения
const model = new modelCounter(0)
//Поиск в DOM элемента в который необходимо отобразить HTML
const targetEl = document.getElementById('app')
//Создание экземляра обьекта view и передача element в которой будет отображен HTML
const view = new viewCounter(targetEl)
//Создание экземляра обьекта controller и передача view и model для их связи внутри controller
const controller = new controllerCounter(view, model)
//Инициализация controller
controller.init()




