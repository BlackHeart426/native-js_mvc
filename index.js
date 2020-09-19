//Создание модели
const modelCounter = function(n) {
  this.counter = n
}

modelCounter.prototype.getCounter = function(type, fn) {
  type && (type === 'increaseCount' ? ++this.counter :  --this.counter)
  fn(this.counter)
}

const viewCounter = function (el) {
  this.el = el
  this.onClick = null
}

viewCounter.prototype.render = function(data) {
  this.el.innerHTML = '<h3>Counter:</h3>' +
    '<p>' + data.counter + '</p>' +
    '<button id="decreaseCount" data-type="decreaseCount" class="decrease button" >-</button> ' +
    '<button id="increaseCount" data-type="increaseCount" class="increase button" >+</button>';

  const increaseCount = this.el.querySelector('#increaseCount');
  increaseCount.addEventListener('click', this.onClick);

  const decreaseCount = this.el.querySelector('#decreaseCount');
  decreaseCount.addEventListener('click', this.onClick);
}

const controllerCounter = function(view, model) {
  this.viewCounter = view
  this.modelCounter = model
}

controllerCounter.prototype.init = function() {
  this.viewCounter.onClick = this.onClick.bind(this)
  this.modelCounter.getCounter(null, this.showCounter.bind(this))
}

controllerCounter.prototype.onClick = function(e) {
  const target = e.currentTarget.dataset.type
  this.modelCounter.getCounter(target, this.showCounter.bind(this))
}

controllerCounter.prototype.showCounter = function(modelData) {
  const viewModel = {
    counter: modelData
  }
  this.viewCounter.render(viewModel)
}

const model = new modelCounter(0)

const targetEl = document.getElementById('app')
const view = new viewCounter(targetEl)

const controller = new controllerCounter(view, model)

controller.init()




