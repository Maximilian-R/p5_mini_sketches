class Inventory extends Node {
  constructor(x, y) {
    super(x, y);
    this.width = 240;
    this.height = 200;
    if(x + this.width / 2 > width) this.pos.x = width - this.width / 2;
    if(y + this.height / 2 > height) this.pos.y = height - this.height / 2;

    this.items = [
      new InventoryItem(createVector(x, y), LogicAnd, "AND"),
      new InventoryItem(createVector(x, y), LogicOr, "OR"),
      new InventoryItem(createVector(x, y), LogicNot, "NOT"),
      new InventoryItem(createVector(x, y), LogicXor, "XOR"),
      new InventoryItem(createVector(x, y), LogicTimer, "TIMER"),
      new InventoryItem(createVector(x, y), LogicCounter, "COUNTER"),
      new InventoryItem(createVector(x, y), LogicSelector, "SELECTOR"),
      new InventoryItem(createVector(x, y), LogicBattery, "BATTERY"),
      new InventoryItem(createVector(x, y), LogicSwitch, "SWITCH"),
      new InventoryItem(createVector(x, y), LogicSplitter, "SPLITTER"),
      new InventoryItem(createVector(x, y), LogicCombiner, "COMBINER"),
      new InventoryItem(createVector(x, y), LogicKeyInput, "KEYINPUT"),
      new InventoryItem(createVector(x, y), Light, "LIGHT")
    ];

    this.createLayout();
  }

  createLayout() {
    var x = this.items[0].width / 2;
    var y = this.items[0].height / 2;
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      item.initPos.x = this.pos.x - this.width / 2 + x;
      item.initPos.y = this.pos.y - this.height / 2 + y;
      item.pos = item.initPos;
      x += item.width;
      if(x + item.width/2 > this.width) {
        y += 40;
        x = 40;
      }
    }
  }

  draw() {
    rectMode(CENTER);
    fill(170);
    stroke(255);
    strokeWeight(4);
    rect(this.pos.x, this.pos.y, this.width, this.height);

    for (var i = 0; i < this.items.length; i++) {
      this.items[i].draw();
    }
  }
}

class InventoryItem extends InteractAble {
  constructor(initPos, logicClass, text) {
    super(initPos.x, initPos.y);
    this.initPos = initPos;
    this.pos = this.initPos;
    this.logicClass = logicClass;
    this.text = text;
    this.width = 80;
    this.height = 40;
  }

  draw() {
    rectMode(CENTER);
    textAlign(CENTER);

    fill(170);
    if(this.mouseIsOver) {
      stroke(112, 2, 124);
    } else {
      stroke(255);
    }
    rect(this.pos.x, this.pos.y, this.width, this.height);

    noStroke();
    fill(255);
    text(this.text, this.pos.x, this.pos.y);
  }

  isColliding(point) {
    if (this.pos.dist(point) < 20) return true;
    return false;
  }

  createItem() {
    new this.logicClass(mouseX, mouseY);
    this.resetItem();
    this.frameColor = color(255);
  }

  resetItem() {
    this.pos = this.initPos;
  }
}
