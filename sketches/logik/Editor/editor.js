/* All handling of mosue and keys should be handled in inputHandler */

class Editor {
  constructor(workspace) {
    this.workspace = workspace;
    this.grid = new Grid();
    this.cursor = createVector(0, 0);

    this.connection;
    this.inventoryItem;
    this.nodeWithOpenGUI;

    mainHandler.mouseHandler.subscribe(this);
    mainHandler.keyboardHandler.subscribe(this);
  }

  keyPressed() {
    if (keyCode == 192) {
      if(this.nodeWithOpenGUI != null) {
        this.nodeWithOpenGUI.gui.hide();
        this.nodeWithOpenGUI.remove();
        this.nodeWithOpenGUI = null;
      }
    }
  }


  /* Open & Close GUI of logics */
  mouseClicked(nodesClicked) {

    /* Close open GUI or do nothing if click is inside gui */
    if (this.nodeWithOpenGUI != null) {

      var guiBounds = this.nodeWithOpenGUI.gui.domElement.getBoundingClientRect();
      if (mouseX > guiBounds.x && mouseX < guiBounds.x + guiBounds.width
      && mouseY < guiBounds.y + guiBounds.height) {

      } else {
        this.nodeWithOpenGUI.gui.hide();
        this.nodeWithOpenGUI = null;
      }
    }

    /* Open GUI*/
    for (var i = 0; i < nodesClicked.length; i++) {
      if (nodesClicked[i].gui != null) {
        nodesClicked[i].gui.show();
        this.nodeWithOpenGUI = nodesClicked[i];
        break;
      }
    }
  }

  /* Create and Move connection */
  mousePressed(nodesAtMouse) {
    for (var i = 0; i < nodesAtMouse.length; i++) {
      var node = nodesAtMouse[i];

      /* Create new connection */
      if (node instanceof OutputSocket) {
        this.connection = mainHandler.world.addToWorld(new Connection(node));
      }

      /* Remove existing connection, create a new */
      if (node instanceof InputSocket && node.hasConnection()) {
        /* Disconnect from InputSocket */
        this.connection = node.connections.pop();
        this.connection.output = null;
      }

      /* Select InventoryItem */
      if (node instanceof InventoryItem) {
        this.inventoryItem = node;
      }
    }
  }

  /* Create or drop connection */
  mouseReleased(nodesAtMouse) {

    for (var i = 0; i < nodesAtMouse.length; i++) {
      var nodeAtMouse = nodesAtMouse[i];

      /* Complete or Delete Connection */
      if(this.connection != null) {
        if(nodeAtMouse instanceof InputSocket) {
          this.connection.setOutput(nodeAtMouse);
          this.connection = null;
        } else {
          this.connection.remove();
          this.connection = null;
        }
      }
    }

    if (nodesAtMouse.length == 0 && this.connection != null) {
      this.connection.remove();
      this.connection = null;
    }

    /* Create Or reset InventoryItem item  -- Does not care about nodes at mouse */
    if (this.inventoryItem != null //&& nodeAtMouse instanceof InventoryItem
    && !inventory.isCollidingRect(createVector(mouseX, mouseY))) {
      this.inventoryItem.createItem();
      this.inventoryItem = null;
    } else if (this.inventoryItem != null) { //&& nodeAtMouse instanceof InventoryItem){
      this.inventoryItem.resetItem();
      this.inventoryItem = null;
    }
  }

  mouseDragged() {
    this.positionGrid();
    if(this.connection == null) { return; }
    this.connection.endPosition = mainHandler.world.positionInWorld(createVector(mouseX, mouseY));
  }

  mouseMoved() {
    this.positionGrid();
  }
  
  positionGrid() {
    let mousePos = this.grid.snapToGrid(this.workspace.positionInWorld(createVector(mouseX, mouseY)));
    this.cursor = this.grid.snapToGrid(mousePos);
    this.grid.position = this.cursor;
  }

  draw() {
    this.grid.draw();
    fill(0);
    //ellipse(this.cursor.x, this.cursor.y,  10, 10);
  }
}